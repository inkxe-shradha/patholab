angular.module('patholab').controller("DashBoardController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout", "UserService", function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout, UserService) {
    $scope.sideBarArray = [
        {
            name: "Dashboard",
            status: true,
            current: true,
            icons: "ti-home"
        },
        {
            name: "Add Test Report",
            status: true,
            current: false,
            icons: "ti-bar-chart"
        },
    ];
    $scope.init = function(){
        console.log('Initialize the Controller');
    }
}]);