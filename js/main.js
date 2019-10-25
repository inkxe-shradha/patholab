var app = angular
  .module("patholab", [
    "ngRoute",
    "ngAnimate",
    "angularCSS",
    "ngMaterial",
    "ngMessages",
    "angular-loading-bar",
    "ui.bootstrap",
    "ui.utils"
  ])
  .config([
    "$routeProvider",
    "$locationProvider",
    "cfpLoadingBarProvider",
    function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
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
          controller: "UserController"
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
    app.directive("specialChar", function() {
      function link(scope, elem, attrs, ngModel) {
        ngModel.$parsers.push(function(viewValue) {
          var reg = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./1-9]*$/;
          if (viewValue.match(reg)) {
            return viewValue;
          }
          var transformedValue = ngModel.$modelValue;
          ngModel.$setViewValue(transformedValue);
          ngModel.$render();
          return transformedValue;
        });
      }

      return {
        restrict: "A",
        require: "ngModel",
        link: link
      };
    });
    app.directive("floatingNumberOnly", function() {
      return {
        require: "ngModel",
        link: function(scope, ele, attr, ctrl) {
          ctrl.$parsers.push(function(inputValue) {
            // console.log(inputValue);
            var pattern = new RegExp("(^[0-9]{1,9})+(.[0-9]{1,4})?$", "g");
            if (inputValue == "") return "";
            var dotPattern = /^[.]*$/;

            if (dotPattern.test(inputValue)) {
              // console.log("inside dot Pattern");
              ctrl.$setViewValue("");
              ctrl.$render();
              return "";
            }

            var newInput = inputValue.replace(/[^0-9.]/g, "");
            // newInput=inputValue.replace(/.+/g,'.');

            if (newInput != inputValue) {
              ctrl.$setViewValue(newInput);
              ctrl.$render();
            }
            //******************************************
            //***************Note***********************
            /*** If a same function call made twice,****
             *** erroneous result is to be expected ****/
            //******************************************
            //******************************************

            var result;
            var dotCount;
            var newInputLength = newInput.length;
            if ((result = pattern.test(newInput))) {
              // console.log("pattern " + result);
              dotCount = newInput.split(".").length - 1; // count of dots present
              if (dotCount == 0 && newInputLength > 9) {
                //condition to restrict "integer part" to 9 digit count
                newInput = newInput.slice(0, newInputLength - 1);
                ctrl.$setViewValue(newInput);
                ctrl.$render();
              }
            } else {
              //pattern failed
              // console.log("pattern " + result);
              // console.log(newInput.length);

              dotCount = newInput.split(".").length - 1; // count of dots present
              // console.log("dotCount  :  " + dotCount);
              if (newInputLength > 0 && dotCount > 1) {
                //condition to accept min of 1 dot
                // console.log("length>0");
                newInput = newInput.slice(0, newInputLength - 1);
                // console.log("newInput  : " + newInput);
              }
              if (newInput.slice(newInput.indexOf(".") + 1).length > 4) {
                //condition to restrict "fraction part" to 4 digit count only.
                newInput = newInput.slice(0, newInputLength - 1);
                // console.log("newInput  : " + newInput);
              }
              ctrl.$setViewValue(newInput);
              ctrl.$render();
            }

            return newInput;
          });
        }
      };
    });
    app.directive("price", [
      function() {
        return {
          require: "ngModel",
          link: function(scope, element, attrs, ngModel) {
            attrs.$set("ngTrim", "false");

            var formatter = function(str, isNum) {
              str = String(Number(str || 0) / (isNum ? 1 : 100));
              str = (str == "0" ? "0.0" : str).split(".");
              str[1] = str[1] || "0";
              return (
                str[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
                "." +
                (str[1].length == 1 ? str[1] + "0" : str[1])
              );
            };
            var updateView = function(val) {
              scope.$applyAsync(function() {
                ngModel.$setViewValue(val || "0.00");
                ngModel.$render();
              });
            };
            var parseNumber = function(val) {
              var modelString = formatter(ngModel.$modelValue, true);
              var sign = {
                pos: /[+]/.test(val),
                neg: /[-]/.test(val)
              };
              sign.has = sign.pos || sign.neg;
              sign.both = sign.pos && sign.neg;

              if (
                !val ||
                (sign.has && val.length == 1) ||
                (ngModel.$modelValue && Number(val) === 0)
              ) {
                var newVal =
                  !val || (ngModel.$modelValue && Number() === 0) ? "" : val;
                if (ngModel.$modelValue !== newVal) updateView(newVal);

                return "";
              } else {
                var valString = String(val || "");
                var newSign =
                  (sign.both && ngModel.$modelValue >= 0) ||
                  (!sign.both && sign.neg)
                    ? "-"
                    : "";
                var newVal = valString.replace(/[^0-9]/g, "");
                var viewVal = newSign + formatter(angular.copy(newVal));

                if (modelString !== valString) updateView(viewVal);

                return Number(newSign + newVal) / 100 || 0;
              }
            };
            var formatNumber = function(val) {
              if (val) {
                var str = String(val).split(".");
                str[1] = str[1] || "0";
                val =
                  str[0] + "." + (str[1].length == 1 ? str[1] + "0" : str[1]);
              }
              return parseNumber(val);
            };

            ngModel.$parsers.push(parseNumber);
            ngModel.$formatters.push(formatNumber);
          }
        };
      }
    ]);

    app.directive("validNumber", function() {
      return {
        require: "?ngModel",
        link: function(scope, element, attrs, ngModelCtrl) {
          if (!ngModelCtrl) {
            return;
          }

          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
              var val = "";
            }

            var clean = val.replace(/[^-0-9\.]/g, "");
            var negativeCheck = clean.split("-");
            var decimalCheck = clean.split(".");
            if (!angular.isUndefined(negativeCheck[1])) {
              negativeCheck[1] = negativeCheck[1].slice(
                0,
                negativeCheck[1].length
              );
              clean = negativeCheck[0] + "-" + negativeCheck[1];
              if (negativeCheck[0].length > 0) {
                clean = negativeCheck[0];
              }
            }

            if (!angular.isUndefined(decimalCheck[1])) {
              decimalCheck[1] = decimalCheck[1].slice(0, 2);
              clean = decimalCheck[0] + "." + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind("keypress", function(event) {
            if (event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    });
    app.directive("noFloat", function() {
      return {
        restrict: "A",
        link: function(scope, elm, attrs, ctrl) {
          elm.on("keydown", function(event) {
            if ([110, 190].indexOf(event.which) > -1) {
              // dot and numpad dot
              event.preventDefault();
              return false;
            } else {
              return true;
            }
          });
        }
      };
    });
    app.directive("numbersOnly", function() {
      return {
        require: "ngModel",
        link: function(scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
            if (text) {
              var transformedInput = text.replace(/[^0-9]/g, "");

              if (transformedInput !== text) {
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
              }
              return transformedInput;
            }
            return undefined;
          }
          ngModelCtrl.$parsers.push(fromUser);
        }
      };
    });
    app.directive("autoFocus", function($timeout) {
      return {
        restrict: "AC",
        link: function(_scope, _element) {
          $timeout(function() {
            _element[0].focus();
          }, 0);
        }
      };
    });

    app.directive("stringToNumber", function() {
      return {
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {
          ngModel.$parsers.push(function(value) {
            return "" + value;
          });
          ngModel.$formatters.push(function(value) {
            return parseFloat(value);
          });
        }
      };
    });
    app.directive("compareTo", compareTo);

    //Used the User Module
    document.write('<script type="text/javascript" src="js/UserModule.js"></script>');
    document.write('<script type="text/javascript" src="js/UserService.js"></script>');  
    document.write('<script type="text/javascript" src="js/userController.js"></script>');

    //Used the Dashboard Module
    document.write('<script type="text/javascript" src="js/DashBoardService.js"></script>');  
    document.write('<script type="text/javascript" src="js/dashBoardController.js"></script>');

     //Used the Addtext report Module
    document.write('<script type="text/javascript" src="js/AddTextReportModule.js"></script>'); 
    document.write('<script type="text/javascript" src="js/AddTextReportService.js"></script>');  
    document.write('<script type="text/javascript" src="js/AddTextReportController.js"></script>'); 
    
     //Used the Patients report Module
    document.write('<script type="text/javascript" src="js/PatientsController.js"></script>'); 
    document.write('<script type="text/javascript" src="js/PatientsService.js"></script>');  
    document.write('<script type="text/javascript" src="js/PatientsModule.js"></script>'); 

    //Used the Addtest Report report Module
    document.write('<script type="text/javascript" src="js/AddReportModule.js"></script>'); 
    document.write('<script type="text/javascript" src="js/AddReportService.js"></script>');  
    document.write('<script type="text/javascript" src="js/AddReportController.js"></script>'); 