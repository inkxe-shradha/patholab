angular.module('patholab').controller("AddTextReportController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout","UserModule","AddTextReportModule","AddTextReportService", function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout,UserModule,AddTextReportModule,AddTextReportService){
    $scope.isAddTextReportClicked = false; 
    $scope.addtextLoader = true; 
    $scope.init = function()
    {
        if(AddTextReportModule.isDataSet())
        {

        }else{
            AddTextReportService.loadAllTextData();
        }
    };
}]);