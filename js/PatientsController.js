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
    $scope.isBillingClicked = false;
    $scope.testReportArray = [];
    $scope.dataTableOpt = {
    //custom datatable options 
    // or load data through ajax call also
    "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
    };
    $scope.showProductSection = false;
    $scope.singleReport = []; 
    $scope.singlePatientDetails = {};
    $scope.totalReportPrice = 0;

    $scope.init = function()
    {
        if (PatientsModule.isDataSet()) {
            $scope.patientsLoader = false;
            $scope.patientFormLoader = false;
            $scope.patienArray = PatientsModule.getPatientData();
        } else {
          PatientsService.loadAllTextData();
        }
        loadAllReport();
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
        $scope.isBillingClicked = false;
    };

    $scope.backToTable = function(){
        $scope.patientTabelShow = true;
        $scope.isPatientClicked = false; 
        $scope.isBillingClicked = false;
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
        $scope.isBillingClicked = false;
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

    $scope.deleteUser = function(patientId)
    {
      $scope.singlePatientId = patientId;
      modalSetUp('deleteID','myModal','bounceIn','bounceOut','show');
    };

    var modalSetUp = function(modalBtnId,modalBtnName,animateInClss,animateOutClss,type)
    {
        var modalBtn = $('#'+modalBtnId);
        var modal = $("#"+modalBtnName + "");
        var animInClass = animateInClss;
        var animOutClass = animateOutClss;
        if(type == "show")
        {
          modal.removeClass(animOutClass);
          modal.addClass(animInClass);
          $("#" + modalBtnName + "").modal("show");
        }else{
           modal.removeClass(animInClass);
           modal.addClass(animOutClass);
           $timeout(function(){
             $("#" + modalBtnName + "").modal("hide");
           },500);
        }
    };

    $scope.deleteModal = function(){
      if($scope.singlePatientId)
      {
        PatientsService.deleteRecord($scope.singlePatientId).then(function(pRes){
           if(pRes.data && pRes.data.status == "success")
           {
              modalSetUp("deleteID", "myModal", "bounceIn", "bounceOut", "hide");
              $scope.patientsLoader = true;
              PatientsService.loadAllTextData();
              $scope.isAlertError = true;
              $scope.alertClasss = "success";
              $scope.alertMessage = "Data deleted successfully";
              $timeout(function() {
                $scope.isAlertError = false;
              },2000);
           }else{
             $scope.isAlertError = true;
             $scope.alertClasss = "danger";
             $scope.alertMessage = "Failed to delete data successfully";
             $timeout(function() {
               $scope.isAlertError = false;
             },2000);
           }
        });
      }
    };

    $scope.closeModal = function() {
      modalSetUp("deleteID", "myModal", "bounceIn", "bounceOut", "hide");
    };

    $scope.generateBill = function(patient) {
      if ($scope.testReportArray.length == 0) {
        $scope.isAlertError = true;
        $scope.alertClasss = "danger";
        $scope.alertMessage =
          "Please generate at least one test report to generate bill";
        $timeout(function() {
          $scope.isAlertError = false;
        }, 2000);
        return;
      }
      $scope.patientTabelShow = false;
      $scope.isPatientClicked = false;
      $scope.isBillingClicked = true;
      $scope.singlePatientDetails = patient;
      autocomplete();
    };

    function autocomplete() {
      $scope.self = this;

      self.simulateQuery = false;
      self.isDisabled = false;

      // list of `state` value/display objects
      self.states = loadAll();
    }
     $scope.newState = function(state) {
       alert(
         "Sorry! You'll need to create a Constitution for " + state + " first!"
       );
     };
     /**
      * Search for states... use $timeout to simulate
      * remote dataservice call.
      */
     $scope.querySearch = function(query) {
       var results = query
           ? self.states.filter(createFilterFor(query))
           : self.states,
         deferred;
       if (self.simulateQuery) {
         deferred = $q.defer();
         $timeout(
           function() {
             deferred.resolve(results);
           },
           Math.random() * 1000,
           false
         );
         return deferred.promise;
       } else {
         return results;
       }
     };
     $scope.searchTextChange = function(text) {
       //  $log.info("Text changed to " + text);
     };

     $scope.selectedItemChange = function(item) {
       if (item != undefined && item != "") {
         for (let index = 0; index < $scope.singleReport.length; index++) {
           if ($scope.singleReport[index].testId == item.testId) {
             $scope.isAlertError = true;
             $scope.alertClasss = "danger";
             $scope.alertMessage = "You Select two report of same name";
             $timeout(function() {
               $scope.isAlertError = false;
             }, 2000);
             return;
           }
         }
         $scope.showProductSection = true;
         $scope.singleReport.push(item);
         $scope.totalReportPrice = 0;
         angular.forEach($scope.singleReport,function(value,key){
           $scope.totalReportPrice = parseFloat($scope.totalReportPrice) + parseFloat(value.price);
         });
       }
     };

     /**
      * Build `states` list of key/value pairs
      */
     function loadAll() {
       var product = [];
       console.log($scope.testReportArray);
       if($scope.testReportArray.length != 0)
       {
         for (let index = 0; index < $scope.testReportArray.length; index++) {
          product.push({
            value: $scope.testReportArray[index].test_name.toLowerCase(),
            display: $scope.testReportArray[index].test_name,
            price: $scope.testReportArray[index].test_price,
            testId: $scope.testReportArray[index].id,
            createdDate: getCurrentDate()
          });
         }
       }
       return product;
     }

     /**
      * Create filter function for a query string
      */
     function createFilterFor(query) {
       var lowercaseQuery = query.toLowerCase();

       return function filterFn(state) {
         return state.value.indexOf(lowercaseQuery) === 0;
       };
     }

     function loadAllReport(){
       PatientsService.loadAllReport().then(function(pRes){
         if (pRes.data && pRes.data.status == "Success") {
           $scope.testReportArray = pRes.data.data;
         } else {
           $scope.testReportArray = [];
         }
       });
     }
     function getCurrentDate() {
       var today = new Date();
       var dd = today.getDate();
       var mm = today.getMonth() + 1; //January is 0!

       var yyyy = today.getFullYear();
       if (dd < 10) {
         dd = "0" + dd;
       }
       if (mm < 10) {
         mm = "0" + mm;
       }
       var rtuenDay = dd + "/" + mm + "/" + yyyy;
       return rtuenDay;
     }

     $scope.removeReport = function(index){
       $scope.singleReport.splice(index,1);
       if($scope.singleReport.length == 0)
       {
         $scope.showProductSection = false; 
       }
        $scope.totalReportPrice = 0;
        angular.forEach($scope.singleReport, function(value, key) {
          $scope.totalReportPrice =
            parseFloat($scope.totalReportPrice) + parseFloat(value.price);
        });
     }; 

     $scope.savePatientDetails = function(){
       $scope.patientsLoader = true;
       PatientsService.saveBillingData($scope.singleReport,$scope.singlePatientDetails).then(function(pRes) {
         if(pRes.data && pRes.data.status == "success")
         {
            window.open("http://patholab.doctor.com/API/textReport/generatePdf/"+$rootScope.Key+"/"+pRes.data.data[0], "_blank");
         }else{
            $scope.singleReport = [];
            $scope.isAlertError = true;
            $scope.alertClasss = "danger";
            $scope.alertMessage = "Failed to generate bill . Please try again !";
            $timeout(function() {
              $scope.isAlertError = false;
            }, 2000);
         }
         $scope.patientsLoader = false;
       });
     };
}]);  