angular.module('patholab').controller("PatientsController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout","UserModule","PatientsModule","PatientsService", function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout,UserModule,PatientsModule,PatientsService){
    $scope.isPatientClicked = false; 
    $scope.patientsLoader   = true; 
    $scope.patientTabelShow = true;
    $scope.patientObject = {
        pateintName : '',
        patientNumber : '',
        patientAge : '',
        gender : '',
        address : ''
    };
    $scope.patientFormLoader = false;
    $scope.isAlertError = false; 
    $scope.alertClasss = '';
    $scope.alertMessage = '';
    $scope.patienArray = [];
    $scope.dataTableOpt = {
    //custom datatable options 
    // or load data through ajax call also
    "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
    };
    $scope.init = function()
    {
        if (PatientsModule.isDataSet()) {
            $scope.patientsLoader = false;
            $scope.patientFormLoader = false;
            $scope.patienArray = PatientsModule.getPatientData();
        } else {
          PatientsService.loadAllTextData();
        }
    };

    $rootScope.$on("PATIENTDATA_LOADED_EVENT",function(event,data){
        $scope.patientsLoader = false;
         $scope.patientFormLoader = false;
         $scope.patienArray = data;
    });

    $scope.addPatientsForm = function(){
        $scope.patientForm.$setPristine();
        $scope.patientForm.$setValidity();
        $scope.patientTabelShow = false;
        $scope.isPatientClicked = true; 
    };

    $scope.backToTable = function(){
        $scope.patientTabelShow = true;
        $scope.isPatientClicked = false; 
        $scope.patientObject = {
            pateintName: "",
            patientNumber: "",
            patientAge: "",
            gender: "",
            address: ""
        };
        $scope.patientForm.$setPristine();
        $scope.patientForm.$setValidity();
    };

    $scope.refreshTabel = function(){
        $scope.patientsLoader = true; 
        $scope.patientTabelShow = true;
        $scope.isPatientClicked = false;
        $scope.patientObject = {
          pateintName: "",
          patientNumber: "",
          patientAge: "",
          gender: "",
          address: ""
        };
        PatientsService.loadAllTextData();
    }; 

    $scope.savePatientDetails = function(patient)
    {
        $scope.patientFormLoader = true;
        PatientsService.sendPatientData(patient).then(function(pRes){
           if(pRes.data.status = "success")
           {
                $scope.patientFormLoader = false;
                $scope.patientObject = {
                  pateintName: "",
                  patientNumber: "",
                  patientAge: "",
                  gender: "",
                  address: ""
                };
                $scope.patientForm.$setPristine();
                $scope.patientForm.$setValidity();
                $scope.patientsLoader = true; 
                $scope.patientTabelShow = true;
                $scope.isPatientClicked = false; 
                PatientsService.loadAllTextData();
           }else{
               $scope.isAlertError = true;
               $scope.alertClasss = "danger";
               $scope.alertMessage = "Failed to Insert Data";
               $timeout(function(){
                   $scope.isAlertError = false;
               });
           }
        });
    };
}]);