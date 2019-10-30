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
     $sql = "SELECT * FROM `relation_report`";
    
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

  public function getAllReportResult()
  {
    $attachArray = [];
    $sql = "SELECT * FROM `report_data`";
    
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

  public function saveTestData($reportName,$reportPrice)
  {
    $sql = "INSERT INTO `report_data`( `test_name`, `test_price`) VALUES ('$reportName','$reportPrice')";
    $result = $this->db->query($sql);
    if($result)
    {
        return true;
    }else{    
        return "Error =>". $this->db->error;
    }
  }

  public function deleteTestData($id)
  {
      $sql = "DELETE FROM `report_data` WHERE id = $id ";
      $result = $this->db->query($sql);
      if($result)
      {
          return 'success';
      }else{
          return 'error'.$this->db->error;
      }
  }

  public function updateTestReport($id,$tstName,$txtPrice,$date)
  {
      $sql = "UPDATE `report_data` SET `test_name`= '$tstName',`test_price`= '$txtPrice',`updated_date`='$date' WHERE id ='$id'";
      $result = $this->db->query($sql);
      if($result)
      {
        return 'success';
      }else{
        return 'error'.$this->db->error;
      }
  }

  public function saveDataBill($reportName,$reportPrice,$reportId,$address,$gender,$age,$number,$name,$patientId)
  {
      $sql = "INSERT INTO `relation_report`(`patient_id`, `report_name`, `report_price`) VALUES ('$patientId','$reportName','$reportPrice')";
      $result = $this->db->query($sql);
      if($result)
      {
        return 'success';
      }else{
        return 'error'.$this->db->error;
      }
  }

  public function fetchSingleDetails($id)
  {
      $sql = "SELECT * FROM `patient_data` WHERE id = $id";
      $result = $this->db->query($sql);
      $row=[];
      if($result->num_rows > 0)
      {
        $row = $result->fetch_row();
    
      }
      return $row;
  }

  public function getAllReports($id)
  {
      $attachArray = [];
      $sql = "SELECT * FROM `relation_report` WHERE `patient_id` = '$id' ";
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

  public function getAllTestReport($id)
  {
      $attachArray = [];
      $sql = "SELECT * FROM `patient_data` WHERE `id` = $id ";
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
}