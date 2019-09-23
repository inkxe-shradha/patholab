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
      }
    ]);
    document.write('<script type="text/javascript" src="js/userController.js"></script>'); 