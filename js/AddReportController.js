angular.module('patholab').controller("AddReportController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout","UserModule","AddReportModule","AddReportService", function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout,UserModule,AddReportModule,AddReportService){
    $scope.reportLoader = true;
    $scope.testReportShow = true;
    $scope.isAlertError = false;
    $scope.alertClasss = '';
    $scope.alertMessage = '';
    $scope.testReportFormLoader = false;
    $scope.isTestReportClicked = false;
    $scope.testReportArr = [];
    $scope.testReportObj = {
        reportName : '',
        reportPrice : 0.00,
        createdDate : getCurrentDate()
    };
    $scope.addTestReportArry = [];
   
    $scope.init = function()
    {
        $scope.dataTableOpt = {
        //custom datatable options
        // or load data through ajax call also
        aLengthMenu: [[10, 50, 100, -1], [10, 50, 100, "All"]]
        };
       if (AddReportModule.isDataSet()) {
         $scope.reportLoader = false;
         $scope.testReportFormLoader = false;
         $scope.testReportArr = AddReportModule.getReportData();
       } else {
         AddReportService.loadAllTextData();
       }
    };

    $rootScope.$on("REPORT_DATA_LOADED", function(event, data) {
      $scope.reportLoader = false;
      $scope.testReportFormLoader = false;
      $scope.testReportArr = data;
    });

    $scope.addPatientsForm = function(){
        $scope.isTestReportClicked = true;
        $scope.testReportShow = false;
        $scope.addTestReportArry.push($scope.testReportObj);
    };
    function getCurrentDate()
     {
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

     $scope.removeColoum = function(index){
         $scope.addTestReportArry.splice(index,1);
     }; 

     $scope.addColum = function(){
        $scope.testReportObj = {
        reportName: "",
        reportPrice: 0.0,
        createdDate: getCurrentDate()
        };
        $scope.addTestReportArry.push($scope.testReportObj);
     };

     $scope.saveReportData = function()
     {
         var isValid = false;
         for(i=0;i<$scope.addTestReportArry.length;i++)
         {
              if ($scope.addTestReportArry[i].reportName !== undefined && $scope.addTestReportArry[i].reportName !== "") {
                if (
                  $scope.addTestReportArry[i].reportPrice !== undefined &&
                  $scope.addTestReportArry[i].reportPrice !== "" &&
                  $scope.addTestReportArry[i].reportPrice !== 0.0
                ) {
                  isValid = true;
                } else {
                  $scope.isAlertError = true;
                  $scope.alertClasss = "danger";
                  $scope.alertMessage =
                    "Test report Price should not be empty OR Zero Ruppees";
                  $timeout(function() {
                    $scope.isAlertError = false;
                  }, 2000);
                   $("body").scrollTop(0);
                  return;
                }
              } else {
                $scope.isAlertError = true;
                $scope.alertClasss = "danger";
                $scope.alertMessage = "Test report name should not be empty";
                $timeout(function() {
                  $scope.isAlertError = false;
                }, 2000);
                return;
              }
         }
         if(isValid)
         {
             $scope.testReportFormLoader = true;
             AddReportService.saveAllReportData($scope.addTestReportArry).then(function(pRes){
                 if (pRes.data.status == "success") {
                   $scope.isTestReportClicked = false;
                   $scope.testReportShow = true;
                   $scope.testReportFormLoader = false;
                   $scope.reportLoader = true;
                   AddReportModule.resetData();
                   AddReportService.loadAllTextData();
                 } else {
                   $scope.testReportFormLoader = false;
                   $scope.isAlertError = true;
                   $scope.alertClasss = "danger";
                   $scope.alertMessage = "Failed to save data";
                   $timeout(function() {
                     $scope.isAlertError = false;
                   }, 2000);
                 }
             });
         }
     };

     $scope.deleteReport = function(reportId){
          $scope.singleReport = reportId;
          modalSetUp("deleteID", "deleteModal", "wobble", "bounceOutDown", "show");
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
           },1000);
        }
    };

    $scope.closeModal = function() {
        modalSetUp("deleteID", "deleteModal", "wobble", "bounceOutDown", "hide");
    }; 

    $scope.deleteModal = function(){
        modalSetUp("deleteID", "deleteModal", "wobble", "bounceOutDown", "hide");
        $scope.reportLoader = true;
        AddReportService.deleteTestData($scope.singleReport).then(function(pRes){
            if(pRes.data && pRes.data.status == "success")
            {
                AddReportModule.resetData();
                AddReportService.loadAllTextData();
            }else{
                $scope.isAlertError = true;
                $scope.alertClasss = "danger";
                $scope.alertMessage = "Failed to Delete data";
                $timeout(function() {
                  $scope.isAlertError = false;
                }, 2000);
            }
        });
    };

    $scope.refreshTabel = function(){
         $scope.dataTableOpt = {
           //custom datatable options
           // or load data through ajax call also
           aLengthMenu: [[10, 50, 100, -1], [10, 50, 100, "All"]]
         };
         $scope.reportLoader = true;
         AddReportModule.resetData();
         AddReportService.loadAllTextData();
    };
}]);