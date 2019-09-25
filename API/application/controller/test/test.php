<?php
/**
 * Testing The Class For INSERT,DELETE,FETCH DATA Through API'S.
 */
class Test extends Controller
{
    /**
     * Index Function For Loading Script's ,CSS And HTML File's.
     * Modfication Date: 5th OCT 2018.
     * Developed By : RiaxeTM.
     */
    public function index()
    {
        
       
    }

    /**
     * Used To Insert The Customer Details .
     * Used Method to Catch Data : POST.
     * Modification Date: 5th OCT 2018.
     * Developed By : RiaxeTM.
     */
    public function insertCutomer()
    {
        header('Access-Control-Allow-Origin: *');
        /** Remember To change  This Commemnt Dta When Angular Tuterial Warp up*/
        header("Content-Type: application/json; charset=UTF-8");
        /*$fp = fopen('php://input', 'r');
                                                                                                                                            $rawData = stream_get_contents($fp);
                                                                                                                                            echo "<pre>";
                                                                                                                                            print_r($rawData);
                                                                                                                                            echo "</pre>";
        */
        $source = json_decode(file_get_contents('php://input'), true);
        $name = $source["fullName"]; //$_POST['name'];
        $email = $source["emailId"]; //$_POST['mail'];
        if (($name && $email) == null) {
            throw new Exception("Data Value Will Not Be Null");
        }
        try {
            $customer_model = $this->loadmodel('testmodel');
            if ($customer_model->insertData($name, $email)) {
                $reasult = [];
                $reasult['status'] = 1;
                $reasult['date'] = date('l jS \of F Y h:i:s A');
                $reasult['message'] = 'Data Inserted SuccessFully';
                echo json_encode($reasult);
            } else {
                $reasult = [];
                $reasult['status'] = 0;
                $reasult['date'] = date('l jS \of F Y h:i:s A');
                $reasult['message'] = 'Some Internal Error Occured Or Email Already Exit';
                echo json_encode($reasult);
            }
        } catch (Exception $e) {
            echo 'Message: ' . $e->getMessage();
            exit();
        }
    }
    /**
     * Used Onluy For Angular API Call
     * Modification Date: 5th OCT 2018.
     * Developed By : RiaxeTM.
     */
    public function angularSearch()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type:application/json');

        # Load Model And Stor Data In Array Format.
        # Echo Data In Json Format Usng Jsonencoded Function.
        if (isset($_GET['search_query'])) {
            $data = $_GET['search_query'];
            $customerDataFetch = $this->loadmodel('testmodel');
            $fetched = $customerDataFetch->getAngularData($data);
            if ($fetched) {
                $result = [];
                $result['data'] = $fetched;
                $result['status'] = 1;
                $result['date'] = date('l jS \of F Y h:i:s A');
            } else {
                $result = [];
                $result['data'] = $fetched;
                $result['status'] = 0;
                $result['date'] = date('l jS \of F Y h:i:s A');
            }

            echo json_encode($result);
        } else {
            $customerDataFetch = $this->loadmodel('testmodel');
            $fetched = $customerDataFetch->getAllData();
            if ($fetched) {
                $result = [];
                $result['data'] = $fetched;
                $result['status'] = 1;
                $result['date'] = date('l jS \of F Y h:i:s A');
            } else {
                $result = [];
                $result['data'] = $fetched;
                $result['status'] = 0;
                $result['date'] = date('l jS \of F Y h:i:s A');
            }

            echo json_encode($result);
        }
    }
    /**
     * Used To Fetch All Customer Details .
     * Used Method to Catch Data : GET.
     * Modification Date: 5th OCT 2018.
     * Developed By : RiaxeTM.
     */
    public function fetchCustomerDetails()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type:application/json');
        if ($_GET['event'] !== 'fire') {
            throw new Exception("Not Able To Fetch The Key");
        }
        try {
            # Load Model And Stor Data In Array Format.
            # Echo Data In Json Format Usng Jsonencoded Function.
            $customerDataFetch = $this->loadmodel('testmodel');
            $fetched = $customerDataFetch->getAllData();
            if ($fetched) {
                $result = [];
                $result['data'] = $fetched;
                $result['status'] = 1;
                $result['date'] = date('l jS \of F Y h:i:s A');
            } else {
                $result = [];
                $result['data'] = $fetched;
                $result['status'] = 0;
                $result['date'] = date('l jS \of F Y h:i:s A');
            }

            echo json_encode($result);
        } catch (Exception $e) {
            echo 'Message: ' . $e->getMessage();
        }
    }

    /**
     * Used To Fetch Single  Customer Details .
     * Used Method to Catch Data : GET.
     * Modification Date: 5th OCT 2018.
     * Developed By : RiaxeTM.
     */
    public function fetchSingleCustomerDetails()
    {
        # Load Model And Stor Data In Array Format.
        # Echo Data In Json Format Usng Jsonencoded Function.
        header('Access-Control-Allow-Origin: *');
        header('Content-Type:application/json');
        if (isset($_GET['num']) == null) {
            throw new Exception("Not Able To Fetch The Key");
        }
        try {
            $id = $_GET['num'];
            $customerDataFetch = $this->loadmodel('testmodel');
            $fetched = $customerDataFetch->getSingleData($id);
            if ($fetched) {
                $result = [];
                $result['data'] = $fetched;
                $result['status'] = 1;
                $result['date'] = date('l jS \of F Y h:i:s A');
            } else {
                $result = [];
                $result['data'] = $fetched;
                $result['status'] = 0;
                $result['date'] = date('l jS \of F Y h:i:s A');
            }

            echo json_encode($result);
        } catch (Exception $e) {
            echo 'Message: ' . $e->getMessage();
        }
    }

    /**
     * Update Customer Details .
     * Using php RESTful API(PUT) Method.
     * Developed By RIAXETM.
     * Modified On : 4th OCT 2018.
     */
    public function updateCustomer()
    {
        header('Access-Control-Allow-Origin: *');
        header("Content-Type: application/json; charset=UTF-8");
        $source = json_decode(file_get_contents('php://input'), true);
        if ($source == null) {
            # code...
            throw new Exception("Data Misssing ,Please fill All field");
        }
        try {
            //print_r($source['id']);
            $name = $source['name']; //name
            $email = $source['mail']; //email for Only Angular 6
            $id = $source['id'];
            $customer_model = $this->loadmodel('testmodel');
            if ($customer_model->updateDataModel($id, $name, $email)) {
                $reasult = [];
                $reasult['status'] = 1;
                $reasult['date'] = date('l jS \of F Y h:i:s A');
                $reasult['message'] = 'Data Updated SuccessFully';
                echo json_encode($reasult);
            } else {
                $reasult = [];
                $reasult['status'] = 0;
                $reasult['date'] = date('l jS \of F Y h:i:s A');
                $reasult['message'] = 'Some Internal Error Occured';
                echo json_encode($reasult);
            }
        } catch (Exception $e) {
            echo 'Message: ' . $e->getMessage();
        }
    }
    /**
     * Delete Customer Details .
     * Using php RESTful API(DELETE) Method.
     * Developed By RIAXETM.
     * Modified On : 4th OCT 2018.
     */
    public function deleteCustomer()
    {
        header('Access-Control-Allow-Origin: *');
        header("Content-Type: application/json; charset=UTF-8");
        $source = json_decode(file_get_contents('php://input'), true);
        if ($source == null) {
            throw new Exception("Data Misssing ,Please fill All field");
        }
        try {
            $delete = $source['id'];
            $customer_model = $this->loadmodel('testmodel');
            if ($customer_model->deleteDataModel($delete)) {
                $reasult = [];
                $reasult['message'] = 'Data Deleted SuccessFully';
                echo json_encode($reasult);
            } else {
                $reasult = [];
                $reasult['message'] = 'Some Internal Error Occured';
                echo json_encode($reasult);
            }
        } catch (Exception $e) {
            echo 'Message: ' . $e->getMessage();
        }
    }
    /**
     * Delete Customer Details .
     * Using php RESTful API(DELETE) Method.
     * Developed By RIAXETM.
     * Modified On : 4th OCT 2018.
     */
    public function signUp()
    {
        header('Access-Control-Allow-Origin: *');
        header("Content-Type: application/json; charset=UTF-8");
        if (isset($_POST) && $_POST == null) {
            throw new Exception("Data Misssing ,Please fill All field");
        }
        try {
            echo $_POST['fullName'];
        } catch (Exception $e) {
            echo 'Message: ' . $e->getMessage();
        }
    }
}
