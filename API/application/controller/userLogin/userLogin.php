<?php
class UserLogin extends Controller
{
    function __construct()
	{
		# code...
        parent::__construct();
        $this->isLoginSessionExpired();
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
            $userModel = $this->loadmodel('userModel');
            $password = password_hash($password, PASSWORD_DEFAULT);
            
            if(($userModel->userSignUp($username,$email,$userId,$password)) === true){
                $result['status'] = 'success';
                $result['userId'] = $userId;
                $result['message'] = 'Data Inserted successfully';
            }else{
                $result['status']  = 'Failed';
                $result['message'] =  $userModel->userSignUp($username,$email,$userId,$password);
               
            }

        }else{
           $result['message'] = "Api key mismatched";
        }

        echo json_encode($result);
        
    }

    private function checkLogInStatus()
    {
        if($this->isLoginSessionExpired() == false && isset($_SESSION['user_id']) && $_SESSION['user_id'] != '')
        {
            return true;
        }
        else{
            return false;
        }
    }

    public function isLoginSessionExpired() {

        $login_session_duration = 3600; 

        $current_time = time(); 

        if(isset($_SESSION['loggedin_time']) and isset($_SESSION["user_id"])){  

            if(((time() - $_SESSION['loggedin_time']) > $login_session_duration)){ 

                return true; 

            } 

        }

        return false;

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
}