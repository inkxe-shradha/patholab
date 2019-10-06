angular.module('patholab').controller("AddTextReportController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout","UserModule", function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout,UserModule){
    $scope.init = function()
    {
        console.log('Initialize Controller');
    };
}]);