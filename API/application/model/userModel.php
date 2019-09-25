<?php
class UserModel 
{
  function __construct($db) 
  {
    //Load the DataBase And Store On Exception Catching Function. 
    try {
     $this->db = $db;
    } catch (Exception $e) {
     exit('Database connection could not be established.');
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
         if($signUp)
         {
             return true;
         }else{
             return $this->db->error;
         }
     }
  }
}