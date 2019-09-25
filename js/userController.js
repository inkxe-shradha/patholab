angular.module('patholab').controller("UserController", ["$scope","$rootScope","$http","$interval","$location","$routeParams","$timeout","UserService",function($scope,$rootScope,$http,$interval, $location, $routeParams, $timeout,UserService) {
    $scope.userDetails = {
      username : '',
      password : '',
    };
    $scope.isSignInActive = true;
    $scope.isSignUpActive = false;
    $scope.usersignUpForm = {
      username: "",
      password: "",
      rePassword: "",
      email: ""
    };
    $scope.userLoader = false;
    $scope.init = function(){
       
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
        UserService.userLogIn(user)
          .then(function(pRes) {
              console.log(pRes);
          })
          .catch(function(data, status) {
            console.error("Gists error", data);
          });
    };

    $scope.signUpVisisble = function(){
        $scope.usersignUpForm = {
            username: "",
            password: "",
            rePassword: "",
            email: ""
        };
        $scope.userDetails = {
            username : '',
            password : '',
        };
        $scope.signUpForm.$setPristine();
        $scope.signUpForm.$setValidity();
        $scope.isSignUpActive = true;
        $scope.isSignInActive = false;
    };

    $scope.signInVisible= function(){
        $scope.usersignUpForm = {
            username: "",
            password: "",
            rePassword: "",
            email: ""
        };
        $scope.userDetails = {
            username : '',
            password : '',
        };
        $scope.adminForm.$setPristine();
        $scope.adminForm.$setValidity();
        $scope.isSignUpActive = false;
        $scope.isSignInActive = true;
    };

    $scope.signUp = function(user){
        $scope.userLoader = true;
        UserService.signUpUser(user).then(function(pRes){
            $scope.userLoader = false;
            console.log(pRes);
        });
    };
}]);