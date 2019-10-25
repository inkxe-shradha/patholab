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
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apiKey']))
        {
            $result = $this->textModel->getAllTextReport();
            
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
}