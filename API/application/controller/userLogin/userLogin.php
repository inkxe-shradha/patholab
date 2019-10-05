<?php
class UserLogin extends Controller
{
    private  $userModel ;
    function __construct()
	{
		# code...
        parent::__construct();
        $this->isLoginSessionExpired();
        $this->userModel =  $this->loadmodel('userModel');
    }
    
    public function index()
    {
        echo "Index Loaded";
    }

    public function logIn()
    {
        $result = [];
        $email = $_REQUEST['email'];
        $password = $_REQUEST['password'];
        $userId = $_REQUEST['userId'];
        $apiKey = $_REQUEST['apikey'];
        if($this->checkApiKey($apiKey))
        {
            $checkLogin = $this->userModel->userSign($email,$password,$userId);
            if($checkLogin != 'Invalid_password' && $checkLogin != 'Invalid_username')
            {
                $result['status'] = "success";
                $result['data']  = $checkLogin;
                $this->setSessionStorage($checkLogin['userName'],$checkLogin['userId']);
            }else{
                $result['status'] = 'Failed';
                $result['message'] = 'Invalid Username Or Password';
            }
        }else{
           $result['message'] = "Api key mismatched";
        }
        
        echo json_encode($result);
    }

    public function signUp()
    {
        
        $result = array();
        $apiKey = $_REQUEST['apikey'];
        $email = $_REQUEST['email'];
        $password = $_REQUEST['password'];
        $username = $_REQUEST['username'];
        $x = 6; // Amount of digits
        $min = pow(10,$x);
        $max = pow(10,$x+1)-1;
        $userId = rand($min, $max);
        if($this->checkApiKey($apiKey))
        {
            $password = password_hash($password, PASSWORD_DEFAULT);
            
            if(($this->userModel->userSignUp($username,$email,$userId,$password)) === true){
                $result['status'] = 'success';
                $result['userId'] = $userId;
                $result['message'] = 'Data Inserted successfully';
            }else{
                $result['status']  = 'Failed';
                $result['message'] =  $this->userModel->userSignUp($username,$email,$userId,$password);
               
            }

        }else{
           $result['message'] = "Api key mismatched";
        }

        echo json_encode($result);
        
    }

    private function checkLogInStatus()
    {
        if($this->isLoginSessionExpired() == 'false' && isset($_SESSION['user_id']) && $_SESSION['user_id'] != '')
        {
            return true;
        }
        else{
            return false;
        }
    }

    private function isLoginSessionExpired() {

        $login_session_duration = 3600; 

        $current_time = time(); 

        if(isset($_SESSION['loggedin_time']) and isset($_SESSION["user_id"])){  

            if(((time() - $_SESSION['loggedin_time']) > $login_session_duration)){ 

                return 'true'; 

            } 

        }

        return 'false';

    }

    public function checkApiKey($key)
    {
        if($key === "APKEYRBDUFFUE2786287GFEWFFQUFQG38847KK09BCM")
        {
            return true;
        }else{
            return false;
        }
    }
    
    private function setSessionStorage($username,$userId)
    {
        if($username  != '' && $userId != '')
        {
            $_SESSION['user_name'] = $username;
            $_SESSION['user_id'] = $userId;
            $_SESSION['loggedin_time'] = time();
        }
    }

    public function checkSessionStatus()
    {
        $result = [];
        if(isset($_REQUEST['apikey']) && $this->checkApiKey($_REQUEST['apikey']) && isset($_SESSION['user_id']) && $_SESSION['user_id'] != '' )
        {
            // echo $this->isLoginSessionExpired();exit();
            if($this->checkLogInStatus())
            {
                $result['status'] = 'success';
                $result['data'] = array(
                    'userId' => $_SESSION['user_id'],
                    'userName' => $_SESSION['user_name']
                );
            }else{
                $result['status'] = 'Expired';
                $result['message'] = 'Session Expired';
            }
        }else{
            $result['status'] = 'Failed';
            $result['message'] = 'Api key Or Data mismatched';
        }
        echo json_encode($result);
    }
}