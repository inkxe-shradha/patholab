var app = angular
    .module("patholab", [
        "ngRoute",
        "ngAnimate",
        "angularCSS",
        "ngMaterial",
        "ngMessages",
        "angular-loading-bar",
    ])
    .config([
        "$routeProvider",
        "$locationProvider",
        "cfpLoadingBarProvider",
        function ($routeProvider, $locationProvider, cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.includeBar = true;
            var url = "http://patholab.doctor.com/";
            $routeProvider
              .when("/", {
                templateUrl: "signin.html",
                controller: "UserController",
                reloadOnSearch: false
              })
              .when("/dashBoard", {
                templateUrl: "dashboard.html",
                controller: "DashBoardController",
                reloadOnSearch: false
              })
              .when("/:param1", {
                templateUrl: "signin.html",
                controller: "UserController",
              })

              .otherwise({
                templateUrl: "404.html"
              });
            $locationProvider.html5Mode(true);
        }
    ]);
    app.run([
      "$window",
      "$rootScope",
      function($window, $rootScope) {
        $rootScope.online = navigator.onLine;
        $window.addEventListener(
          "offline",
          function() {
            $rootScope.$apply(function() {
              $rootScope.online = false;
            });
          },
          false
        );

        $window.addEventListener(
          "online",
          function() {
            $rootScope.$apply(function() {
              $rootScope.online = true;
            });
          },
          false
        );
         $rootScope.rootUrl = "http://patholab.doctor.com/API/";
         $rootScope.Key = "APKEYRBDUFFUE2786287GFEWFFQUFQG38847KK09BCM";
      }
    ]);
    var compareTo = function() {
      return {
        require: "ngModel",
        scope: {
          otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
          ngModel.$validators.compareTo = function(modelValue) {
            return modelValue == scope.otherModelValue;
          };

          scope.$watch("otherModelValue", function() {
            ngModel.$validate();
          });
        }
      };
    };
    app.directive("compareTo", compareTo);

    //Used the User Module
    document.write('<script type="text/javascript" src="js/UserModule.js"></script>');
    document.write('<script type="text/javascript" src="js/UserService.js"></script>');  
    document.write('<script type="text/javascript" src="js/userController.js"></script>');

    //Used the Dashboard Module
    document.write('<script type="text/javascript" src="js/DashBoardService.js"></script>');  
    document.write('<script type="text/javascript" src="js/dashBoardController.js"></script>');