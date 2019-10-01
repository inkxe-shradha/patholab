<?php
class UserModel 
{
  function __construct($db) 
  {
    //Load the DataBase And Store On Exception Catching Function. 
    try {
     $this->db = $db;
    } catch (Exception $e) {
     exit('Database this->dbection could not be established.');
    }
  }

  public function userSignUp($username,$email,$userId,$password)
  {
     $sql = "SELECT * FROM `user` WHERE `user_id`= $userId OR `email` = '$email'";
    
     $result = $this->db->query($sql);
     if($result->num_rows > 0)
     {
         return 'user exit';
     }else{
         $signUp = "INSERT INTO `user`(`user_id`, `username`, `email`, `password`) VALUES ('$userId','$username','$email','$password')";
         $signUpRes = $this->db->query($signUp);
         if($signUpRes)
         {
             return true;
         }else{
             return $this->db->error;
         }
     }
  }
  
  public function userSign($email,$password,$userId ='')
  {
    if($userId != '') $sql = "SELECT * FROM `user` WHERE `email` = '$email' OR `user_id`= $userId ";
    else $sql = "SELECT * FROM `user` WHERE `email` = '$email'";
    $result = $this->db->query($sql);
    $returnArrray = [];
    if($result->num_rows > 0)
    {
      $row = $result->fetch_assoc();
      if (password_verify($password, $row['password'])) {
        $returnArrray['userId'] = $row['user_id'];
        $returnArrray['userName'] = $row['username'];
        $returnArrray['userEmail'] = $row['email'];
        return $returnArrray;
      } else {
          return 'Invalid_password';
      }
    }else{
          return 'Invalid_username';
    }
  }
}