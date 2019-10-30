<?php
class TextReport extends Controller
{
    private $userModel,$isUserLogIn;
    public function __construct()
    {
        # code...
        parent::__construct();
        $this->isUserLogIn = $this->getLoginStatus();
        $this->textModel   = $this->loadmodel('textModel');
    }
    
    public function getallRecord()
    {
        $result = [];
        $arrayData = [];
        $totalArray = [];
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apiKey']))
        {
            $result = $this->textModel->getAllTextReport();
            if(empty($result))
            {
                $totalArray['data'] = [];
            }
            else{
                foreach ($result as $key => $value) {
                    # code...
                    $arrayData[$key]['id'] = $value['id'];
                    $arrayData[$key]['testId'] = $value['test_id'];
                    $arrayData[$key]['testName'] = $value['test_name'];
                    $arrayData[$key]['testPrice'] = $value['test_price'];
                    $arrayData[$key]['patientName'] = $value['patient_name'];
                    $arrayData[$key]['patientAge'] = $value['patient_age'];
                    $arrayData[$key]['patientGender'] = $value['patient_gender'];
                    $arrayData[$key]['address'] = stripslashes($value['patient_address']);
                    $arrayData[$key]['created_date'] =  date('d-m-Y', strtotime($value['created_date']));
                }
                $totalArray['data'] = $arrayData;
            }
            $totalArray['status'] = 'Success';
        }else{
            $result['message'] = 'API Credential Failed';
        }

        echo json_encode($result);
    }

    public function getallPatientRecords()
    {
        $result = [];
        $arrayData = [];
        $totalArray = [];
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apiKey']))
        {
            $result = $this->textModel->getallPatientRecords();
            if(empty($result))
            {
                $totalArray['data'] = [];
            }
            else{
                foreach ($result as $key => $value) {
                    # code...
                    $arrayData[$key]['id'] = $value['id'];
                    $arrayData[$key]['patient_name'] = $value['patient_name'];
                    $arrayData[$key]['patient_number'] = $value['patient_number'];
                    $arrayData[$key]['patient_age'] = $value['patient_age'];
                    $arrayData[$key]['patient_gender'] = $value['patient_gender'];
                    $arrayData[$key]['address'] = stripslashes($value['address']);
                    $arrayData[$key]['created_date'] =  date('d-m-Y', strtotime($value['created_date']));
                }
                $totalArray['data'] = $arrayData;
            }
            $totalArray['status'] = 'Success';
        }
        else{
            $totalArray['status'] = 'Failed';
            $totalArray['message'] = 'API Credential Failed';
        }
        echo json_encode($totalArray);
    }

    public function setPatientData()
    {
        $result = [];
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apikey']))
        {
            $patientName = $_REQUEST['patient_name'];
            $patientNumber = $_REQUEST['patient_number'];
            $PatientAge = $_REQUEST['patient_age'];
            $patientGender = $_REQUEST['patient_gender'];
            if($patientGender)
            {
                $patientGender = 'male';
            }else{
                $patientGender = 'female';
            }
            $patientAddress = addslashes($_REQUEST['patient_address']);
            $status = $this->textModel->insertPatientData($patientName,$patientNumber,$PatientAge,$patientGender,$patientAddress);
            if($status)
            {
                $result['status'] = "success";
                $result['message'] = "Data Entered Success fully";
            }else{
                $result['status'] = 'Failed';
                $result['message'] = 'Internal Error =>'+ $status;
            }
        }
        else{
            $result['status'] = 'Failed';
            $result['message'] = 'API Credential Failed';
        }
         echo json_encode($result);
    }
    
    public function deletePatient()
    {
        $result = [];
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apiKey']))
        {
            $status = $this->textModel->deletePatientRecord($_REQUEST['patient_id']);
            if($status == "success")
            {
                $result['status'] =  "success";
            }else{
                $result['status'] =  "Failed";
            }
        }
        else{
            $result['status'] = 'Failed';
            $result['message'] = 'API Credential Failed';
        }
        echo json_encode($result);

    }

    public function getAllReportDetails()
    {
        $result = [];
        $totalArray = [];
        $arrayData = [];
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apiKey']))
        {
            $result = $this->textModel->getAllReportResult();
            if(empty($result))
            {
                $totalArray['data'] = [];
            }
            else{
                foreach ($result as $key => $value) {
                    # code...
                    $arrayData[$key]['id'] = $value['id'];
                    $arrayData[$key]['test_name'] = $value['test_name'];
                    $arrayData[$key]['test_price'] = $value['test_price'];
                    $arrayData[$key]['created_date'] = date('d-m-Y', strtotime($value['created_date']));
                }
                $totalArray['data'] = $arrayData;
            }
            $totalArray['status'] = 'Success';
        }else{
            $totalArray['status'] = 'Failed';
            $totalArray['message'] = 'API Credential Failed';
        }
         echo json_encode($totalArray);
    }

    public function saveTestData(){
        $result = [];
        $urlData = [];
        $status = false;
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apikey']))
        { 
            $urlData = json_decode($_REQUEST['test_array']);
            foreach ($urlData as $key => $value) {
                $reportName = $value->reportName;
                $reportPrice = $value->reportPrice;
                $status = $this->textModel->saveTestData($reportName,$reportPrice);
            }
            if($status)
            {
                $result['status'] = 'success';
            }
        }else{
            $result['status'] = 'Failed';
            $result['message'] = 'API Credential Failed';
        }
        echo json_encode($result);
    }

    public function deleteTestData()
    {
        $result = [];
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apiKey']))
        {
            $status = $this->textModel->deleteTestData($_REQUEST['test_id']);
            if($status == "success")
            {
                $result['status'] =  "success";
            }else{
                $result['status'] =  "Failed";
            }
        }
        else{
            $result['status'] = 'Failed';
            $result['message'] = 'API Credential Failed';
        }
        echo json_encode($result);
    }

    public function updateReport()
    {
        $result = [];
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apikey']))
        {
            $testName = $_REQUEST['report_name'];
            $testId   = $_REQUEST['report_id'];
            $testPrice = $_REQUEST['report_price'];
            $date = date("Y/m/d");
            $status = $this->textModel->updateTestReport($testId,$testName,$testPrice,$date);
            if($status == "success")
            {
                $result['status'] =  "success";
            }else{
                $result['status'] =  "Failed";
            }

        } 
         else{
            $result['status'] = 'Failed';
            $result['message'] = 'API Credential Failed';
        }
        echo json_encode($result);
    }

    public function generateBill()
    {
        $result = [];
        $arrayReport = [];
        $track = false;
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apikey']))
        {
            $arrayReport = $_REQUEST['report'];
            $address = addslashes($_REQUEST['patient']['address']);
            $gender = $_REQUEST['patient']['patient_gender'];
            $age = $_REQUEST['patient']['patient_age'];
            $number = $_REQUEST['patient']['patient_number'];
            $name = $_REQUEST['patient']['patient_name'];
            $patientId = $_REQUEST['patient']['id'];
            foreach ($arrayReport as $key => $value) {
                # code...
               $status = $this->textModel->saveDataBill($value['display'],$value['price'],$value['testId'],$address,$gender,$age,$number,$name,$patientId);
            }
            if($status == "success")
            {
                
                $result['status'] = 'success';
                $result['data'] = $this->textModel->fetchSingleDetails($patientId);
            }
        }
         else{
            $result['status'] = 'Failed';
            $result['message'] = 'API Credential Failed';
        }
        echo json_encode($result);
    }

    public function generatePdf($apiKey,$id)
    {
        if($this->isUserLogIn && isset($apiKey) && $this->checkApiKey($apiKey))
        {
            $reportArray = $this->textModel->getAllReports($id);
            $patientDetails  = $this->textModel->getAllTestReport($id);
            require 'application/view/generatePdf/index.php';
        }else{
            require 'application/view/warning/index.php';
        }
    }
}