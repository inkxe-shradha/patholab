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
        if($this->isUserLogIn && $this->checkApiKey($_REQUEST['apiKey']))
        {
            print_r($this->textModel->getAllTextReport());
        }
    }
}