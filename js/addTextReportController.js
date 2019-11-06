angular.module('patholab').controller("AddTextReportController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout","UserModule","AddTextReportModule","AddTextReportService","DTOptionsBuilder","DTColumnDefBuilder","DTColumnBuilder", function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout,UserModule,AddTextReportModule,AddTextReportService,DTOptionsBuilder,DTColumnDefBuilder,DTColumnBuilder){
    $scope.isAddTextReportClicked = false; 
     $scope.dtOptions = DTOptionsBuilder.newOptions()
       .withOption("#", [1, "asc"])
       .withOption("lengthMenu", [5, 10, 20, 40, 80, 160])
       .withPaginationType("full_numbers")
       .withDOM("pitrfl");
    $scope.addtextLoader = true; 
    $scope.reportArray = [];
   
    $scope.init = function()
    {
        AddTextReportService.loadAllTextData();
    };

    $rootScope.$on("TEXTDATA_LOADED_EVENT",function(event,data){
        $scope.addtextLoader = false; 
        $scope.isAddTextReportClicked = true; 
        $scope.reportArray = data; 
    });

    $scope.viewReport = function(id){
        window.open("http://patholab.doctor.com/API/textReport/generatePdf/"+$rootScope.Key+"/"+id , "_blank");
    };
}]);