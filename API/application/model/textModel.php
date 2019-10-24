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
       
     }else{
         $attachArray['status'] = 'Failed';
     }
     return $attachArray;
  }

  public function getallPatientRecords()
  {
     $attachArray = [];
     $sql = "SELECT * FROM `patient_data`";
    
     $result = $this->db->query($sql);

     if($result->num_rows > 0)
     {
         while($row = $result->fetch_assoc())
         {
             array_push($attachArray, $row);
         }
       
     }
     return $attachArray;
  }

  public function insertPatientData($patientName,$patientNumber,$PatientAge,$patientGender,$patientAddress)
  {
      $sql = "INSERT INTO `patient_data`( `patient_name`, `patient_number`, `patient_age`, `patient_gender`, `address`) VALUES ('$patientName','$patientNumber','$PatientAge','$patientGender','$patientAddress')";
      $result = $this->db->query($sql);
      if($result)
      {
          return true;
      }else{    
          return "Error =>". $this->db->error;
      }
  }

  public function deletePatientRecord($id)
  {
      $sql = "DELETE FROM `patient_data` WHERE id = $id";
      $result = $this->db->query($sql);
      if($result)
      {
          return 'success';
      }else{
          return 'error'.$this->db->error;
      }
  }
}