<?php
/**
 * Model Class Of  TEST Contrroller.
 * Modified On: 5th OCT 2018.
 * Developed By : RiaxeTM.
 */
class Testmodel 
{
  function __construct($db) 
  {
    //Load the DataBase And Store On Exception Catching Function. 
    try {
     $this->db = $db;
    } catch (PDOException $e) {
     exit('Database connection could not be established.');
    }
  }
  public function getAngularData($data_call)
  {
    # code...

    $sql   = "SELECT * FROM testdata WHERE (id LIKE '%$data_call%' OR name LIKE '%$data_call%' OR mail LIKE '$data_call%')";
    
    $query = $this->db->prepare($sql);
    $query->execute();
    if($query->execute())
    {
      return $query->fetchAll();
    }
    else
    {
      return false;
    }
  }
  /**
   * Used For Inserting Data In Tables.
   * @param name, @param email.
   * Modified On : 5th OCT 2018.
   * Developed By : RiaxeTM.
   */
  public function insertData($name,$email)
  {
    $name  = strip_tags($name);
    $email = strip_tags($email);
    if (($name && $email) != null) {
      # code...
      $sql_check = "SELECT * FROM testdata WHERE mail = :email";
      $query = $this->db->prepare($sql_check);
      $query->bindParam(":email",$email);
      $query->execute();
      $row = $query->fetch(PDO::FETCH_ASSOC);
      if (! $row) {
        # code...
      $sql = "INSERT INTO testdata (name, mail) VALUES (:name,:email)";
      $query = $this->db->prepare($sql);
      $query->execute(array(':name' => $name, ':email' => $email));
      return true;
      }
      else
      {
        return false;
      }
     
    }else
    {
      return false;
    }
  }

  /**
   * Retive All  Data From Table .
   * Modified On : 5th OCT 2018 .
   * Developed By : Riaxe TM.
   */
  public function getAllData()
  {
    $sql   = "SELECT * FROM testdata ORDER BY id desc";
    $query = $this->db->prepare($sql);
    $query->execute();
    if($query->execute())
    {
      return $query->fetchAll();
    }
    else
    {
      return false;
    }
  }

  /**
   * Retive Single Customer  Data From Table .
   * Modified On : 5th OCT 2018 .
   * Developed By : Riaxe TM.
   */
  public function getSingleData($id)
  {
    $sql   = "SELECT * FROM testdata WHERE id = :id OR name = :id OR mail = :id ";
    $query = $this->db->prepare($sql);
    $query->bindParam(":id",$id);
    $query->execute();
    if($query->execute())
    {
      return $query->fetch();
    }
    else
    {
      return false;
    }
  }
  
  /**
   * Update Customer Data.
   * @param id,name,Mail
   * Developed By : Riaxetm
   * Modified On :4th OCT 2018.
   */
  public function updateDataModel($id,$name,$mail)
  {
    $name  = strip_tags($name);
    $email = strip_tags($mail);
    if (($name && $email) != null) {
      # code...
      $sql = "UPDATE testdata SET name = :name, mail = :email WHERE id = :id";
      $query = $this->db->prepare($sql);
      $query->execute(array(':name' => $name, ':email' => $email, ':id' => $id));
      return true;
    }else
    {
      return false;
    }
  }

  /**
   * Delete Customer Data.
   * @param id.
   * Developed By : Riaxetm
   * Modified On :4th OCT 2018.
   */
  public function deleteDataModel($id)
  {
    if (($id) != null) {
    $sql = "DELETE FROM testdata WHERE id= :id";
    $query = $this->db->prepare($sql);
     $query->bindParam(":id",$id);
    $query->execute();
    return true;
  }else
  {
    return false;
  }
  }
}