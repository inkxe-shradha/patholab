angular.module('patholab').controller("AddTextReportController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout","UserModule","AddTextReportModule","AddTextReportService", function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout,UserModule,AddTextReportModule,AddTextReportService){
    $scope.isAddTextReportClicked = false; 
    $scope.addtextLoader = true; 
    $scope.dataTableOpt = {
    //custom datatable options 
    // or load data through ajax call also
    "aLengthMenu": [[10, 50, 100,-1], [10, 50, 100,'All']],
    };
    $scope.init = function()
    {
        if(AddTextReportModule.isDataSet())
        {

        }else{
            AddTextReportService.loadAllTextData();
        }
    };

    $rootScope.$on("TEXTDATA_LOADED_EVENT",function(event,data){
        $scope.addtextLoader = false; 
        $scope.isAddTextReportClicked = true; 
        console.log(data);
    });
}]);