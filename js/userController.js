angular.module('patholab').controller("UserController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout", "UserService","UserModule", function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout, UserService,UserModule) {
    $scope.userDetails = {
        username: '',
        password: '',
    };
    $scope.isSignInActive = true;
    $scope.isSignUpActive = false;
    $scope.usersignUpForm = {
        username: "",
        password: "",
        rePassword: "",
        email: ""
    };
    $scope.signinWarning = false;
    $scope.userLoader = false;
    var userid;
    $scope.init = function() {
       checkLoginSession();
       if ($routeParams.param == "false") {
            $scope.timoutClass = 'alert-danger';
            $scope.toolOnline = true;
            $scope.timeoutWarning = 'Your Session is Expired .Please Login Again To continue.';
      }
    };
    $scope.errorshow = false;
    var count = 0;
    $scope.useSignInLoader = false;

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

    $scope.loginUserDetails = function(user) {
        UserService.userLogIn(user,userid)
            .then(function(pRes) {
                $scope.useSignInLoader = false;
                if(pRes.data.status == "success")
                {
                    $location.path('/dashBoard');
                    UserModule.setUserDetails(pRes.data);
                }else{
                    $scope.timoutClass = 'alert-danger';
                    $scope.toolOnline = true;
                    $scope.timeoutWarning = 'Invalid username or password';
                    $timeout(function() {
                        $scope.toolOnline = false;
                    }, 3000);
                }
            })
            .catch(function(data, status) {
                console.error("Gists error", data);
            });
    };

    $scope.signUpVisisble = function() {
        $scope.usersignUpForm = {
            username: "",
            password: "",
            rePassword: "",
            email: ""
        };
        $scope.userDetails = {
            username: '',
            password: '',
        };
        $scope.signUpForm.$setPristine();
        $scope.signUpForm.$setValidity();
        $scope.isSignUpActive = true;
        $scope.isSignInActive = false;
    };

    $scope.signInVisible = function() {
        $scope.usersignUpForm = {
            username: "",
            password: "",
            rePassword: "",
            email: ""
        };
        $scope.userDetails = {
            username: '',
            password: '',
        };
        $scope.adminForm.$setPristine();
        $scope.adminForm.$setValidity();
        $scope.isSignUpActive = false;
        $scope.isSignInActive = true;
    };

    $scope.signUp = function(user) {
        $scope.userLoader = true;
        UserService.signUpUser(user).then(function(pRes) {
            $scope.userLoader = false;
            if (pRes.data.status == 'success') {
                $scope.signInVisible();
                $scope.signinWarning = true;
                userid = pRes.data.userId;
            } else if (pRes.data.status == "Failed") {
                var message = 'User details already exit';
                errorShowFunction(message, 'alert-danger', 3000);
            }
        });
    };
    

    var errorShowFunction = function(messs, errClass, timer) {
        $scope.errorshow = true;
        $scope.errorClass = errClass;
        $scope.errorMessage = messs;
        $timeout(function() {
            $scope.errorshow = false;
        }, timer);

    };

    var checkLoginSession = function()
    {
        UserService.checkLoginSession().then(function(pRes){
            if(pRes.data && pRes.data.status == "success")
            {
                $location.path('/dashBoard');
                UserModule.setUserDetails(pRes.data);
            }else if(pRes.data.status == "Expired"){
                $scope.signInVisible();
                $scope.timoutClass = 'alert-danger';
                $scope.toolOnline = true;
                $scope.timeoutWarning = 'Your Session is Expired .Please Login Again To continue.';
                $timeout(function() {
                    $scope.toolOnline = false;
                }, 3000);
            }
        });
    };
}]);