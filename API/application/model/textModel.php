<?php
class TextModel 
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

  public function getAllTextReport()
  {
     $attachArray = [];
     $sql = "SELECT * FROM `test_user_data`";
    
     $result = $this->db->query($sql);

     if($result->num_rows > 0)
     {
         while($row = $result->fetch_assoc())
         {
             array_push($attachArray, $row);
         }
         $attachArray['data'] = true;
       
     }else{
         $attachArray['data'] = 'false';
     }
     return $attachArray;
  }
}