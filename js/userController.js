angular.module('patholab').controller("UserController", ["$scope","$rootScope","$http","$interval","$location","$routeParams","$timeout",function($scope,$rootScope,$http,$interval, $location, $routeParams, $timeout) {
    $scope.userDetails = {};
    $scope.init = function(){
        console.log('Hello world');
    };
    var count = 0;
    $rootScope.$watch("online", function(newStatus) {
      if (newStatus == false) {
        $scope.toolOnline = true;
        $scope.timeoutWarning = "Tool is Offline";
        $scope.timoutClass = "alert-danger";
        $timeout(function() {
          $scope.toolOnline = false;
        }, 3000);
        count++;
      }
      if (count > 0 && newStatus) {
        $scope.toolOnline = true;
        $scope.timeoutWarning = "Tool is Online";
        $scope.timoutClass = "alert-success";
        $timeout(function() {
          $scope.toolOnline = false;
        }, 3000);
      }
    });

    $scope.loginUserDetails = function(user){
        
    };
}]);