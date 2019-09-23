
var app = angular
  .module("billing", [
    "ngRoute",
    "ngAnimate",
    "angularCSS",
    "ngMaterial",
    "ngMessages",
    "angular-loading-bar",
    "datatables",
    "datatables.bootstrap"
  ])
  .config([
    "$routeProvider",
    "$locationProvider",
    "cfpLoadingBarProvider",
    function($routeProvider, $locationProvider, cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.includeBar = true;
      var url = "http://shubhlaabhbrass.in/admin/";
      $routeProvider
        .when("/", {
          templateUrl: "userHtml.html",
          controller: "UserController",
          css: [
            url + "vendor/bootstrap/css/bootstrap.min.css",
            url + "fonts/font-awesome-4.7.0/css/font-awesome.min.css",
            url + "fonts/iconic/css/material-design-iconic-font.min.css",
            url + "vendor/animate/animate.css",
            url + "vendor/css-hamburgers/hamburgers.min.css",
            url + "vendor/animsition/css/animsition.min.css",
            url + "vendor/select2/select2.min.css",
            url + "vendor/daterangepicker/daterangepicker.css",
            url + "css/util.css",
            url + "css/main.css"
          ],
          reloadOnSearch: false
        })

        .when("/dashboard", {
          templateUrl: "dashboard.html",
          controller: "DashboardController",
          css: [
            url + "css/wc3.css",
            "https://fonts.googleapis.com/css?family=Raleway",
            url + "vendor/bootstrap/css/bootstrap.min.css",
            "css/fontawsome.css",
            "css/datatables.bootstrap.min.css",
            "css/jquery.dataTables.css",
            "css/angular-datatables.css"
          ]
        })
        .when("/dashboard/:param1", {
          templateUrl: "dashboard.html",
          controller: "DashboardController",
          css: [
            url + "css/wc3.css",
            "https://fonts.googleapis.com/css?family=Raleway",
            url + "vendor/bootstrap/css/bootstrap.min.css",
            "css/fontawsome.css",
            "css/datatables.bootstrap.min.css",
            "css/jquery.dataTables.css",
            "css/angular-datatables.css"
          ]
        })
        .when("/:param1", {
          templateUrl: "userHtml.html",
          controller: "UserController"
        })

        .otherwise({
          templateUrl: "userHtml.html",
          controller: "UserController"
        });
      $locationProvider.html5Mode(true);
    }
  ]);
app.run(['$window', '$rootScope',function($window, $rootScope) {
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
}]);
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
            ngModel.$setViewValue(val || "");
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
            val = str[0] + "." + (str[1].length == 1 ? str[1] + "0" : str[1]);
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

/************************************************************************** User controller *******************************************************************/
app.factory("userModel", [
  "$http",
  function($http) {
    var userDetails = [],
      dataloaded = false,
      setUserDetails = function(userData) {
        for (index = 0; index < userData.length; index++) {
          userDetails.push(userData[i]);
        }
        dataloaded = true;
      },
      getUserDetails = function() {
        return userDetails;
      },
      resetUserDetails = function() {
        while (userDetails.length) {
          userDetails.pop();
        }
      },
      setUserTimeOut = function() {
        dataloaded = false;
      },
      isDataLoaded = function() {
        return dataloaded;
      };
    return {
      setUserDetails: setUserDetails,
      getUserDetails: getUserDetails,
      resetUserDetails: resetUserDetails,
      isDataLoaded: isDataLoaded,
      setUserTimeOut: setUserTimeOut
    };
  }
]);
app.controller("UserController", ["$scope","$rootScope","$http","$interval","$location","$routeParams","$timeout","userModel",function($scope,$rootScope,$http,$interval, $location, $routeParams, $timeout, userModel) {
    $scope.logInForm = true;
    $scope.signUpForm = false;
    $scope.user = {};
    $rootScope.url = "http://shubhlaabhbrass.in/admin/";
    $scope.setError = false;
    $scope.invalidUsername = false;
    $scope.isLoginTrue = false;
    $scope.isSignUp = false;
    $scope.pageLoader = true;
    $scope.dataLoader = false;
    $scope.userlistAlreadyExit = false;
    $scope.productAddError = false;

    $scope.init = function() {
      if ($routeParams.param == "false") {
        $scope.setError = true;
        $scope.logInForm = true;
        $scope.signUpForm = false;
      }
      checkLoginSession();
      $interval(function() {
        checkLoginSession();
      }, 120000); //300000);

      $timeout(function() {
        $scope.pageLoader = false;
        $scope.dataLoader = true;
      }, 3000);
    };

    $scope.signIn = function() {
      $scope.user = {};
      $scope.logInForm = true;
      $scope.signUpForm = false;
    };

    $scope.signUp = function() {
      $scope.user = {};
      $scope.logInForm = false;
      $scope.signUpForm = true;
    };

    $scope.formSubmitSignUp = function(email, password, repassword) {
      if (email != "" && email !== undefined) {
        if (password != "" && password != undefined) {
          if (
            repassword != "" &&
            repassword != undefined &&
            password === repassword
          ) {
            $("#repass").removeClass("alert-validate");
            var _params = $.param({
              apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
              signOption: "signUp",
              email: email,
              password: password
            });
            $scope.isSignUp = true;
            $http({
              method: "POST",
              url: $rootScope.url + "API/setUserSignUp.php",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: _params
            })
              .then(function(pRes) {
                if (pRes.data.status == "success") {
                  $scope.isSignUp = false;
                  $scope.user = {};
                  userModel.setUserDetails(pRes.data.userDetails);
                  $location.path("/dashboard");
                } else {
                  $scope.isSignUp = false;
                  $scope.userlistAlreadyExit = true;
                  $scope.message = pRes.data.message;
                }
              })
              .catch(function(data, status) {
                console.error("Gists error", data);
              });
          }
          $("#repass").addClass("alert-validate");
        }
      }
    };

    $scope.formSubmitSignIn = function(username, password) {
      if (username != "" && username != undefined) {
        if (password != "" && password != undefined) {
          $scope.isLoginTrue = true;
          var _params = $.param({
            apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
            signOption: "signIn",
            email: username,
            password: password
          });
          $http({
            method: "POST",
            url: $rootScope.url + "API/setUserSignUp.php",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: _params
          }).then(function(pRes) {
            if (pRes.data.status == "success") {
              $scope.isLoginTrue = false;
              $scope.user = {};
              userModel.setUserDetails(pRes.data.userDetails);
              $location.path("/dashboard");
            } else {
              $scope.isLoginTrue = false;
              $scope.invalidUsername = true;
            }
          });
        }
      }
    };

    function checkLoginSession() {
      var _params = $.param({
        apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb"
      });
      $http({
        method: "POST",
        url: $rootScope.url + "API/checkSession.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: _params
      })
        .then(function(pRes) {
          if (pRes.data.status == true) {
            userModel.setUserDetails(pRes.data.userDetails);
            $location.path("/dashboard");
          } else if (pRes.data.status == false) {
            $scope.setError = true;
            $scope.logInForm = true;
            $scope.signUpForm = false;
            userModel.resetUserDetails();
            userModel.setUserTimeOut();
            $location.path("/").search({ param: "false" });
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    }
  }
]);

/********************************************************************** Dashboard controller *******************************************************************/
app.controller("DashboardController", ["$scope","$rootScope","$http","$interval","$location","$routeParams","$timeout","userModel","DTOptionsBuilder",
  "DTColumnDefBuilder","DTColumnBuilder","$q","$log",function($scope,$rootScope,$http,$interval,$location,$routeParams, $timeout,userModel,DTOptionsBuilder,DTColumnDefBuilder, DTColumnBuilder, $q,$log) {
    $rootScope.controller = "DashboardController";
    $scope.pageLoader = true;
    $scope.dataLoader = false;
    $scope.alertProductValidation = false;
    //$scope.message = '';
    $scope.productLoader = false;
    $scope.navigations = [
      {
        name: "Overview",
        status: true,
        current: true,
        icons: "fa fa-users fa-fw"
      },
      {
        name: "Inventory",
        status: true,
        current: false,
        icons: "fa fa-bank fa-fw"
      },
      {
        name: "Records Details",
        status: true,
        current: false,
        icons: "fa fa-calendar fa-fw"
      },
      {
        name: "Add Billing",
        status: true,
        current: false,
        icons: "fa fa-money fa-fw"
      },
      {
        name: "Add Product",
        status: true,
        current: false,
        icons: "fa fa-product-hunt  fa-fw"
      },
      {
        name: "Stocks",
        status: true,
        current: false,
        icons: "fa fa-line-chart fa-fw"
      },
      {
        name: "Settings",
        status: true,
        current: false,
        icons: "fa fa-cog fa-fw"
      },
    ];
    $scope.productQuantity = {
      productName: "",
      productMaterial: "",
      storename: "",
      gstId: "",
      productQuantity: '1',
      productUnitPrice: 0,
      productTotalPrice: 0,
      productType: "",
      productDate: "",
      productBuyingPrice: ""
    };
    $scope.productQuantityArray = [];
    var isDataLoaded = false;

    $scope.homeView = true;
    $scope.inventoryView = false;
    $scope.recordStatus = false;
    $scope.billing = false;
    $scope.setting = false;
    $scope.productView = false;
    $scope.getAllProductDetail = [];
    $scope.deleteSuccess = false;
    $scope.deletError = false;
    $scope.stocks  = false;
   
    $scope.billingDetails = {
      discountPrice: 0.0,
      afterDiscount: 0.0,
      productDetails: []
    };
    $scope.billingLoader = false;
    $scope.billingAlert = false;
    $scope.showProductSection = false;
    $scope.billingListShown = false;
    $scope.productInsertArray = [];
    $scope.recordDetailsProduct = [];
    $scope.adminDetailsObj = {
      username: "",
      password: "",
      rePassword: "",
      company: "",
      adminName: "",
      username: "",
      number: "",
      CGST: "",
      SGST: "",
      IGST: "",
      withoutgst: "",
      address: ""
    };
    $scope.stockDetails = [];
    $scope.isSaveProductButtonClicked = [];
    $scope.settingSaveButton = "Save";
    $scope.isEditButtonClicked = [];
    $scope.alertProductValidation = false;
    $scope.inventoryDetails = [];
    $scope.loadInit = function() {
      if (userModel.isDataLoaded() == false) {
        $scope.logOut();
        $location.path("/").search({ param: "false" });
        return false;
      }
      checkLoginSession();
      checkUserAddressExit();
      $scope.productQuantityArray.push($scope.productQuantity);
      getAllProductRecords();
      callProductDataTabels();
      if ($routeParams.cancelProdut == "true") {
        var record = {
          name: "Records Details",
          status: true,
          current: false,
          icons: "fa fa-calendar fa-fw"
        };
        $scope.tabChange(record);
      }
    };
    function dataLoaded() {
      $scope.billingAlert = false;
      if (isDataLoaded) {
        autocomplete();
      } else {
        dataLoaded();
      }
    }
    $scope.logOut = function() {
      var _params = $.param({
        apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb"
      });

      $http({
        method: "POST",
        url: $rootScope.url + "API/logout.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: _params
      })
        .then(function(pRes) {
          if (pRes.data.status == "success") {
            $location.path("/");
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    };

    $scope.tabChange = function(changeTab) {
      $scope.resetAll();
      for ( index = 0; index < $scope.navigations.length; index++) {
        $scope.navigations[index].current = false;
        if ($scope.navigations[index].name == changeTab.name) {
          $scope.navigations[index].current = true;
        }
      }
      if (changeTab.name == "Overview") {
        $scope.productView = false;
        $scope.homeView = true;
        $scope.inventoryView = false;
        $scope.recordStatus = false;
        $scope.billing = false;
        $scope.setting = false;
        $scope.stocks = false;
      } else if (changeTab.name == "Records Details") {
        $scope.productView = false;
        $scope.homeView = false;
        $scope.inventoryView = false;
        $scope.recordStatus = true;
        $scope.billing = false;
        $scope.setting = false;
        $scope.stocks = false;
        recordDetails();
      } else if (changeTab.name == "Add Billing") {
        $scope.productView = false;
        $scope.homeView = false;
        $scope.inventoryView = false;
        $scope.recordStatus = false;
        $scope.billing = true;
        $scope.setting = false;
        $scope.stocks = false;
        dataLoaded();
      } else if (changeTab.name == "Add Product") {
        $scope.productView = true;
        $scope.homeView = false;
        $scope.inventoryView = false;
        $scope.recordStatus = false;
        $scope.billing = false;
        $scope.setting = false;
        $scope.stocks = false;
      } else if (changeTab.name == "Settings") {
        $scope.productView = false;
        $scope.homeView = false;
        $scope.inventoryView = false;
        $scope.recordStatus = false;
        $scope.billing = false;
        $scope.setting = true;
        $scope.stocks = false;
      }
      else if (changeTab.name == "Inventory") {
       
        $scope.productView = false;
        $scope.homeView = false;
        $scope.inventoryView = true;
        $scope.recordStatus = false;
        $scope.billing = false;
        $scope.setting = false;
        $scope.stocks = false;
        getAllInventoryRecords();
      }else if (changeTab.name == "Stocks") {
        $scope.productView = false;
        $scope.homeView = false;
        $scope.inventoryView = false;
        $scope.recordStatus = false;
        $scope.billing = false;
        $scope.setting = false;
        $scope.stocks  = true;
        loadAllStocks();
      } else {
        $scope.productView = false;
        $scope.homeView = true;
        $scope.inventoryView = false;
        $scope.recordStatus = false;
        $scope.billing = false;
        $scope.setting = false;
        $scope.stocks = false;
      }
    };

    function checkLoginSession() {
      var _params = $.param({
        apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb"
      });
      $http({
        method: "POST",
        url: $rootScope.url + "API/checkSession.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: _params
      })
        .then(function(pRes) {
          if (pRes.data.status == true) {
            $timeout(function() {
              $scope.pageLoader = false;
              $scope.dataLoader = true;
            }, 500);
            userModel.setUserDetails(pRes.data.userDetails);
            $scope.adminDetailsObj.username = pRes.data.userDetails.user_name;
            $location.path("/dashboard");
          } else if (pRes.data.status == false) {
            $timeout(function() {
              $scope.pageLoader = false;
              $scope.dataLoader = true;
            }, 500);
            $scope.setError = true;
            $scope.logInForm = true;
            $scope.signUpForm = false;
            userModel.setUserTimeOut();
            $location.path("/").search({ param: "false" });
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    }

    function recordDetails() {
      $scope.productLoader = true;
      var _params = $.param({
        apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
        method: "fetchAllBillingRecords"
      });
      $http({
        method: "POST",
        url: $rootScope.url + "API/userRecordsOperation.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: _params
      })
        .then(function(pRes) {
          if (pRes.data && pRes.data.status == "success") {
            $scope.recordDetailsProduct = pRes.data.data;
          } else if (pRes.data.status == "no records") {
            $scope.recordDetailsProduct = [];
          }
          $scope.productLoader = false;
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    }

    $scope.addProduct = function() {
      $scope.productQuantity = {
        productName: "",
        storename: "",
        productMaterial: "",
        productQuantity: '1',
        gstId: "",
        productUnitPrice: 0,
        productTotalPrice: 0,
        productDate: "",
        productType: "",
        productBuyingPrice : ""
      };
      $scope.productQuantityArray.push($scope.productQuantity);
    };

    $scope.removeProductArrays = function(index) {
      $scope.productQuantityArray.splice(index, 1);
    };

    $scope.calculateProductPrice = function(index, quantity, price) {
      $scope.productQuantityArray[index].productTotalPrice = quantity * price;
    };

    $scope.saveAllDetails = function(productQuantityArray) {
      var isValid = false;
      for ( index = 0; index < productQuantityArray.length; index++) {
        if (
          $scope.productQuantityArray[index].productDate != "" &&
          $scope.productQuantityArray[index].productDate != undefined
        ) {
          $scope.productQuantityArray[index].dateObj = formatDate(
            $scope.productQuantityArray[index].productDate
          );
        }
        if (
          productQuantityArray[index].productName != "" &&
          productQuantityArray[index].productName != undefined
        ) {
           if (
            productQuantityArray[index].productType != "" &&
            productQuantityArray[index].productType != undefined
          ) {
          if (
            productQuantityArray[index].productBuyingPrice != "" &&
            productQuantityArray[index].productBuyingPrice != undefined &&
            productQuantityArray[index].productBuyingPrice != 0
          ) {
            if (
              productQuantityArray[index].productMaterial != "" &&
              productQuantityArray[index].productMaterial != undefined
            ) {
              if (
                productQuantityArray[index].productQuantity != "" &&
                productQuantityArray[index].productQuantity != undefined &&
                productQuantityArray[index].productQuantity != 0
              ) {
                if (
                  productQuantityArray[index].productUnitPrice != "" &&
                  productQuantityArray[index].productUnitPrice != undefined &&
                  productQuantityArray[index].productUnitPrice != 0
                ) {
                  isValid = true;
                } else {
                  $scope.alertProductValidation = true;
                  $scope.message = "Please Enter The Product Price";
                  $timeout(function() {
                    $scope.alertProductValidation = false;
                  }, 3000);
                  isValid = false;
                  return false;
                }

                $scope.message = "Please Enter The Product Quantity";
              } else {
                $scope.alertProductValidation = true;
                $timeout(function() {
                  $scope.alertProductValidation = false;
                }, 3000);
                isValid = false;
                return false;
              }
            } else {
              $scope.alertProductValidation = true;
              $scope.message = "Please Enter The Product Material";
              $timeout(function() {
                $scope.alertProductValidation = false;
              }, 3000);
              isValid = false;
              return false;
            }
          } else {
            $scope.alertProductValidation = true;
            $scope.message = "Please Enter The Product Buying Price";
            $timeout(function() {
              $scope.alertProductValidation = false;
            }, 3000);
            isValid = false;
            return false;
          }
         } else {
          $scope.alertProductValidation = true;
          $scope.message = "Please Enter The Product Unit Type";
          $timeout(function() {
            $scope.alertProductValidation = false;
          }, 3000);
          isValid = false;
          return false;
        }
        } else {
          $scope.alertProductValidation = true;
          $scope.message = "Please Enter The Product Name";
          $timeout(function() {
            $scope.alertProductValidation = false;
          }, 3000);
          isValid = false;
          return false;
        }
      }
      if (isValid) {
        $scope.productLoader = true;
        var _params = $.param({
          apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
          data: productQuantityArray,
          method: "insert"
        });
        $http({
          method: "POST",
          url: $rootScope.url + "API/userRecordsOperation.php",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: _params
        })
          .then(function(pRes) {
            if (pRes.data.status == "success") {
              $scope.productLoader = false;
              while ($scope.productQuantityArray.length) {
                $scope.productQuantityArray.pop();
              }
              $scope.productQuantity = {
                productName: "",
                storename: "",
                productMaterial: "",
                productQuantity: '1',
                gstId: "",
                productUnitPrice: 0,
                productTotalPrice: 0,
                productDate: "",
                productType: "",
                productBuyingPrice: ""
              };
              $scope.productQuantityArray.push($scope.productQuantity);
              getAllProductRecords();
              $scope.productSuccess = true;
              $timeout(function() {
                $scope.productSuccess = false;
              }, 3000);
            } else {
              $scope.productLoader = true;
              $scope.productAddError = true;
              $timeout(function() {
                $scope.productAddError = false;
              }, 3000);
            }
          })
          .catch(function(data, status) {
            console.error("Gists error", data);
          });
      }
    };
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
    function callProductDataTabels() {
      $scope.dtOptions = DTOptionsBuilder.newOptions()
        // .withOption("order", [1, "asc"])
        .withOption("lengthMenu", [5, 10, 20, 40, 80, 160])
        .withPaginationType("full_numbers")
        .withDOM("pitrfl");

      // $scope.dtColumnDefs = [
      //   DTColumnDefBuilder.newColumnDef(100),
      //   DTColumnDefBuilder.newColumnDef(1).notVisible(),
      //   DTColumnDefBuilder.newColumnDef(2).notSortable()
      // ];
    }

    function getAllProductRecords() {
      $http
        .get(
          $rootScope.url +
            "API/userRecordsOperation.php?apikey=axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb&method=fetchProductDetails"
        )
        .then(function(response) {
          if (response.data.status == "succes") {
            isDataLoaded = true;
            $scope.getAllProductDetail = response.data.data;
            angular.forEach(response.data.data,function(value,key){
              $scope.isSaveProductButtonClicked[key] = false;
              $scope.isEditButtonClicked[key] = false;
            });
          } else {
            isDataLoaded = true;
            $scope.getAllProductDetail = [];
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    }

    $scope.deleteRecord = function(index, productId) {
      $scope.productDeleteId = productId;
      $("#deleteModal").modal("show");
    };
    $scope.deleteRecordModal = function(index, productId) {
      $scope.productDeleteId = productId;
      $("#deleteRecordModal").modal("show");
    };
    $scope.deleteInventory = function(index, productId) {
      $scope.productDeleteId = productId;
      $("#deleteInventory").modal("show");
    };

    $scope.confirmIntoryModal = function() {
      $scope.billingLoader = true;
      var _params = $.param({
        apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
        inventory_id: $scope.productDeleteId,
        method: "deleteInventory"
      });
      $http({
        method: "POST",
        url: $rootScope.url + "API/userRecordsOperation.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: _params
      })
        .then(function(pRes) {
          if (pRes.data.status == "success") {
            $("#deleteInventory").modal("hide");
            $scope.billingLoader = false;
            $scope.deleteSuccess = true;
            $timeout(function() {
              $scope.deleteSuccess = false;
            }, 3000);
            getAllInventoryRecords();
          } else {
            $("#deleteInventory").modal("hide");
            $scope.billingLoader = false;
            $scope.deletError = true;
            $timeout(function() {
              $scope.deletError = false;
            }, 3000);
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    };
    $scope.confirmDelete = function() {
      $scope.productLoader = true;
      var _params = $.param({
        apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
        product_id: $scope.productDeleteId,
        method: "Delete"
      });
      $http({
        method: "POST",
        url: $rootScope.url + "API/userRecordsOperation.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: _params
      })
        .then(function(pRes) {
          if (pRes.data.status == "success") {
            $("#deleteModal").modal("hide");
            $scope.productLoader = false;
            $scope.deleteSuccess = true;
            $timeout(function() {
              $scope.deleteSuccess = false;
            }, 3000);
            getAllProductRecords();
          } else {
            $("#deleteModal").modal("hide");
            $scope.productLoader = false;
            $scope.deletError = true;
            $timeout(function() {
              $scope.deletError = false;
            }, 3000);
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    };
    $scope.confirmRecordDelete = function() {
      $scope.productLoader = true;
      var _params = $.param({
        apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
        id: $scope.productDeleteId,
        method: "DeleteRecordDetails"
      });
      $http({
        method: "POST",
        url: $rootScope.url + "API/userRecordsOperation.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: _params
      })
        .then(function(pRes) {
          if (pRes.data.status == "success") {
            $("#deleteRecordModal").modal("hide");
            $scope.productLoader = false;
            $scope.deleteSuccess = true;
            $timeout(function() {
              $scope.deleteSuccess = false;
            }, 3000);
            recordDetails();
          } else {
            $("#deleteRecordModal").modal("hide");
            $scope.productLoader = false;
            $scope.deletError = true;
            $timeout(function() {
              $scope.deletError = false;
            }, 3000);
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    };
    function autocomplete() {
      $scope.self = this;

      self.simulateQuery = false;
      self.isDisabled = false;

      // list of `state` value/display objects
      self.states = loadAll();
    }
    $scope.newState = function(state) {
      alert(
        "Sorry! You'll need to create a Constitution for " + state + " first!"
      );
    };
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    $scope.querySearch = function(query) {
      var results = query
          ? self.states.filter(createFilterFor(query))
          : self.states,
        deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(
          function() {
            deferred.resolve(results);
          },
          Math.random() * 1000,
          false
        );
        return deferred.promise;
      } else {
        return results;
      }
    };
    $scope.searchTextChange = function(text) {
      //  $log.info("Text changed to " + text);
    };

    $scope.selectedItemChange = function(item) {
      if (item != undefined && item != "") {
        $scope.showProductSection = true;
        if (item.stocks.stock_quantity != 0) $scope.productInsertArray.push(item);
        else{
          $scope.billingClass = 'alert-danger';
          $scope.alertMessage = 'Product is Out of Stocks.Please add stock to continue and generate bill';
          $scope.billingAlert = true;
          $timeout(function(){
            $scope.billingAlert = false;
          },3000);
        }

        $scope.switchWithoutGst = true;
      } else {
        if ($scope.productInsertArray.length == 0) {
          $scope.showProductSection = false;
        }
        resetPrice();
        $scope.switchWithoutGst = false;
      }
      // console.log($scope.productInsertArray);
    };

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      //  var allStates =
      //    "Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
      //       Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
      //       Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
      //       Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
      //       North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
      //       South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
      //       Wisconsin, Wyoming";

      //  return allStates.split(/, +/g).map(function(state) {
      //    return {
      //      value: state.toLowerCase(),
      //      display: state
      //    };
      //  });
      var product = [];
      if ($scope.getAllProductDetail.length !== 0) {
        for (
           index = 0;
          index < $scope.getAllProductDetail.length;
          index++
        ) {
          product.push({
            value: $scope.getAllProductDetail[index].product_name.toLowerCase(),
            display: $scope.getAllProductDetail[index].product_name,
            product_quantity:
              $scope.getAllProductDetail[index].product_quantity,
            product_unit_price: $scope.getAllProductDetail[index].product_price,
            product_total_price:
              $scope.getAllProductDetail[index].product_total_price,
            product_material:
              $scope.getAllProductDetail[index].product_material,
            stocks: $scope.getAllProductDetail[index].stock_management[0],
            type: $scope.getAllProductDetail[index].product_type
          });
        }
      }
      return product;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();

      return function filterFn(state) {
        return state.value.indexOf(lowercaseQuery) === 0;
      };
    }
    function calculateBillingPrice(
      billingSwitch,
      quntity,
      unitPrice,
      paymablePrice,
      CGST,
      SGST
    ) {
      $scope.discountablePrice(0);
      // CGST = (CGST == '')? 0 : CGST/100;
      // SGST = (SGST == '' )? 0 : SGST/100;
      // paymablePrice = paymablePrice;
      // var unit_Price,total;
      // unit_Price = quntity * unitPrice;
      // if(billingSwitch)
      // {
      //   CGST = (unit_Price * CGST).toFixed(2);
      //   SGST = (unit_Price * SGST).toFixed(2);
      //   total = unit_Price + parseFloat(CGST) + parseFloat(SGST) + parseFloat(paymablePrice);
      // }else{
      //   total = unit_Price + paymablePrice;
      // }
      // console.log(total);
      var total;
      total = quntity * unitPrice;

      return total.toFixed(2);
    }

    $scope.billingsChange = function(
      billingSwitch,
      quntity,
      unitPrice,
      paymablePrice,
      CGST,
      SGST
    ) {
      $scope.billingDetails.product_price_without_cal = quntity * unitPrice;
      if (billingSwitch) {
        $scope.billingDetails.withGstTax = calculateBillingPrice(
          billingSwitch,
          quntity,
          unitPrice,
          paymablePrice,
          CGST,
          SGST
        );
        $scope.billingDetails.total_price = $scope.billingDetails.withGstTax;
        $scope.billingDetails.afterDiscount = $scope.billingDetails.total_price;
      } else {
        $scope.billingDetails.withOutGst = calculateBillingPrice(
          billingSwitch,
          quntity,
          unitPrice,
          paymablePrice,
          CGST,
          SGST
        );
        $scope.billingDetails.total_price = $scope.billingDetails.withOutGst;
        $scope.billingDetails.afterDiscount = $scope.billingDetails.total_price;
      }
    };

    $scope.discountablePrice = function(discountPrice) {
      if (
        discountPrice != "" &&
        discountPrice != undefined &&
        discountPrice != 0
      ) {
        if (discountPrice <= $scope.billingDetails.total_price) {
          $scope.billingDetails.afterDiscount =
            $scope.billingDetails.total_price - discountPrice;
        } else {
          $scope.billingDetails.discountPrice = 0.0;
          $scope.showDiscountAlert = true;
          $timeout(function() {
            $scope.showDiscountAlert = false;
          }, 3000);
          $scope.billingDetails.afterDiscount =
            $scope.billingDetails.total_price;
        }
      } else {
        $scope.billingDetails.discountPrice = 0.0;
        $scope.billingDetails.afterDiscount = $scope.billingDetails.total_price;
      }
    };

    function resetPrice() {
      $scope.billingDetails = {
        discountPrice: 0.0,
        afterDiscount: 0.0,
        withOutGstVal: 0.0,
        productDetails: []
      };
    }
    $scope.warningColor = [];
    $scope.isgenrateBill = false;
    $scope.withOutGst = function(isGst, quantity, stockQuantity, index) {
      quantity = quantity == undefined ? 0 : parseInt(quantity);
      if ((stockQuantity - quantity) < 0) {
        $scope.warningColor[index] = "alert-danger";
        $scope.isgenrateBill = true;
      } else {
        $scope.warningColor[index] = "alert-warning";
        $scope.isgenrateBill = false;
      }
      $scope.switchWithoutGst = isGst;
      if (isGst) {
        $scope.discountablePrice(0);
        checkProductPrice();
        $scope.billingDetails.withOutGst = 0.0;
        $scope.billingDetails.afterDiscount = $scope.billingDetails.total_price;
      } else {
        $scope.discountablePrice(0);
        checkProductPrice();
        $scope.billingDetails.withGstTax = 0.0;
        $scope.billingDetails.afterDiscount = $scope.billingDetails.total_price;
      }
    };

    $scope.generateBill = function(billingDetails) {
      var keepGoing = true;
       angular.forEach($scope.productInsertArray, function(value, key) {
         if(keepGoing && $scope.warningColor[key] != "alert-warning")
         {
           $scope.isgenrateBill = true;
           keepGoing = false;
         }
       });
      if ($scope.isgenrateBill == false) 
      {
        
        $scope.billingLoader = true;
        $scope.billingAlert = false;
        var _params = $.param({
          apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
          method: "billing",
          data: billingDetails,
          gstDetails: $scope.adminDetailsObj,
          gst_on: $scope.switchWithoutGst
        });
        $http({
          method: "POST",
          url: $rootScope.url + "API/userRecordsOperation.php",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: _params
        })
          .then(function(pRes) {
            $scope.billingLoader = false;
            if (pRes.data.status == "success") {
              $scope.searchText = "";
              $scope.billingDetails = {};
              resetPrice();
              $scope.billingClass = "alert-success";
              $scope.billingAlert = true;
              $scope.alertMessage = "Success! Billing generated successfully.";
              $scope.resetAll();
              // var record = {
              //   name: "Records Details",
              //   status: true,
              //   current: false,
              //   icons: "fa fa-calendar fa-fw"
              // };
              // getAllProductRecords();
              window.location.href =
                $rootScope.url + "API/invoice.php?recordId=" + pRes.data.id;
              // $scope.tabChange(record);
            } else {
              $scope.billingLoader = false;
              $scope.searchText = "";
              $scope.billingDetails = {};
              resetPrice();
              $scope.alertMessage = "Failed to!  Generate Bill.";
              $scope.billingClass = "alert-danger";
              $scope.billingAlert = true;
              $scope.resetAll();
            }
          })
          .catch(function(data, status) {
            console.error("Gists error", data);
          });
      }
    };

    $scope.generatePdf = function(ival, recordId) {
      for ( index = 0; index < $scope.recordDetailsProduct.length; index++) {
        if ($scope.recordDetailsProduct[index].id == recordId) {
          window.location.href =
            $rootScope.url + "API/invoice.php?recordId=" + recordId;
          return false;
        } else {
          // console.log("Wrong Id");
        }
      }
    };

    $scope.generateBillingForm = function() {
      var isValidation = false;
      if ($scope.productInsertArray.length == 0) {
        $scope.billingAlert = true;
        $scope.billingClass = "alert-danger";
        $scope.alertMessage = "Please add atleast one product to continue.";
        isValidation = false;
      } else if (hasDuplicates($scope.productInsertArray)) {
        $scope.billingAlert = true;
        $scope.billingClass = "alert-danger";
        $scope.alertMessage = "Same Product Can not be added multiple time.";
        isValidation = false;
        return false;
      } else {
        $scope.billingDetails.productDetails = $scope.productInsertArray;
        angular.forEach($scope.productInsertArray, function(value, key) {
          $scope.warningColor[key] = "alert-warning";
        });
        checkProductPrice();
        $scope.billingAlert = false;
        $scope.billingClass = "";
        $scope.alertMessage = "";
        isValidation = true;
      }
      if (isValidation) {
        $scope.isDisabled = true;
        $scope.showProductSection = false;
        $scope.billingListShown = true;
      }
    };

    function hasDuplicates(array) {
      return new Set(array).size !== array.length;
    }

    $scope.resetAllBilling = function() {
      $scope.productInsertArray = [];
      $scope.isDisabled = false;
      $scope.billingListShown = false;
      $scope.billingListShown = false;
      $scope.switchWithoutGst = true;
      $scope.discountablePrice(0);
    };

    function checkProductPrice() {
      var total_price = [];
      if ($scope.switchWithoutGst) {
        angular.forEach($scope.billingDetails.productDetails, function(
          value,
          key
        ) {
          total_price[key] = parseFloat(
            calculateBillingPrice(
              $scope.switchWithoutGst,
              value.product_quantity,
              value.product_unit_price
            )
          );
        });
        $scope.billingDetails.total_price = total_price.reduce((a, b) => a + b,0);
        $scope.billingDetails.total_price =
          $scope.billingDetails.total_price +
          parseFloat($scope.adminDetailsObj.IGST) +
          $scope.billingDetails.total_price *
            (parseFloat($scope.adminDetailsObj.CGST) / 100 +
              parseFloat($scope.adminDetailsObj.SGST) / 100);
      } else {
        angular.forEach($scope.billingDetails.productDetails, function(
          value,
          key
        ) {
          total_price[key] = parseFloat(
            calculateBillingPrice(
              $scope.switchWithoutGst,
              value.product_quantity,
              value.product_unit_price
            )
          );
        });
        $scope.billingDetails.total_price =
          total_price.reduce((a, b) => a + b, 0) +
          parseFloat($scope.adminDetailsObj.withoutgst);
      }
    }

    $scope.removeProduct = function(index) {
      $scope.productInsertArray.splice(index, 1);
    };

    function checkUserAddressExit() {
      $http
        .get(
          $rootScope.url +
            "API/userRecordsOperation.php?apikey=axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb&method=checkAdminDetails"
        )
        .then(function(response) {
          if (response.data.status == "success") {
            $scope.adminDetailsObj = response.data.data;
            $scope.settingSaveButton = "Update";
          } else {
            for (i = 0; i < $scope.navigations.length; i++) {
              if ($scope.navigations[i].name == "Overview") {
                $scope.navigations[i].status = true;
              } else if ($scope.navigations[i].name == "Settings") {
                $scope.navigations[i].status = true;
              } else {
                $scope.navigations[i].status = false;
              }
            }
            $scope.settingSaveButton = "Save";
            $scope.warningMeassge =
              "Please fill the generalsettings of Admin to generate billing!";
            $timeout(function() {
              $("#warningModal").modal("show");
            }, 800);
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    }

    $scope.saveAdminAddress = function() {
      $scope.billingLoader = true;
      var _params = $.param({
        apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
        method: "setAdminDetails",
        data: $scope.adminDetailsObj
      });
      $http({
        method: "POST",
        url: $rootScope.url + "API/userRecordsOperation.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: _params
      })
        .then(function(pRes) {
          $scope.billingLoader = false;
          $scope.billingAlert = true;
          if (pRes.data.status == "success") {
            $scope.settingSaveButton =
              pRes.data.button == "insert" ? "Save" : "Update";
            for (i = 0; i < $scope.navigations.length; i++) {
              if ($scope.navigations[i].name == "Inventory") {
                $scope.navigations[i].status = true;
              } else {
                $scope.navigations[i].status = true;
              }
            }
            $scope.tabChange($scope.navigations[1]);
            $scope.billingClass = "alert-success";
            $scope.alertMessage = "Data Saved Successfully";
            $timeout(function() {
              $scope.billingAlert = false;
            }, 1000);
            checkUserAddressExit();
          } else {
            $scope.billingClass = "alert-danger";
            $scope.alertMessage = "Error Occured";
            $timeout(function() {
              $scope.billingAlert = false;
            }, 2000);
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    };

    function resetInput() {
      $("input").focus(function() {
        $(this)
          .parents(".form-group")
          .addClass("focused");
      });

      $("textarea").focus(function() {
        $(this)
          .parents(".form-group")
          .addClass("focused");
      });

      $("input").blur(function() {
        var inputValue = $(this).val();
        if (inputValue == "") {
          $(this).removeClass("filled");
          // $(this).addClass('error');
          $(this)
            .parents(".form-group")
            .removeClass("focused");
        } else {
          $(this).addClass("filled");
          // $(this).removeClass('error');
        }
      });
      $("textarea").blur(function() {
        var inputValue = $(this).val();
        if (inputValue == "") {
          $(this).removeClass("filled");
          // $(this).addClass('error');
          $(this)
            .parents(".form-group")
            .removeClass("focused");
        } else {
          $(this).addClass("filled");
          // $(this).removeClass('error');
        }
      });
    }
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

    function loadAllStocks()
    {
      $scope.billingLoader = true;
      $http
        .get(
          $rootScope.url +
            "API/userRecordsOperation.php?apikey=axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb&method=fetchAllStocks"
        )
        .then(function(response) {
          if (response.data.status == "success") {
      $scope.billingLoader = false;
            $scope.stockDetails = response.data.data;
          } else {
      $scope.billingLoader = false;
            $scope.stockDetails = [];
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    }

    $scope.update = function(index){
      $scope.isSaveProductButtonClicked[index] = true;
      $scope.isEditButtonClicked[index] = true;
    };

    $scope.resetAll = function(index){
       $scope.isSaveProductButtonClicked[index] = false;
       $scope.isEditButtonClicked[index] = false;
        getAllProductRecords();
    };

    $scope.updateProduct = function(index,product){
      if($scope.getAllProductDetail[index].product_name != '' && $scope.getAllProductDetail[index].product_name != undefined)
      {
        if($scope.getAllProductDetail[index].product_material != '' && $scope.getAllProductDetail[index].product_material != undefined)
        {
         if($scope.getAllProductDetail[index].product_quantity != '' && $scope.getAllProductDetail[index].product_quantity != undefined)
         {
           if($scope.getAllProductDetail[index].product_price != '' && $scope.getAllProductDetail[index].product_price != undefined)
           {
             $scope.productLoader = true;
              var _params = $.param({
                apikey: "axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb",
                method: "updateProductRecords",
                product: $scope.getAllProductDetail[index],
              });
              $http({
                method: "POST",
                url: $rootScope.url + "API/userRecordsOperation.php",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: _params
              })
                .then(function(pRes) {
                  $scope.productLoader = false;
                  if (pRes.data.status == "success") {
                     $scope.isSaveProductButtonClicked[index] = false;
                     $scope.isEditButtonClicked[index] = false;
                    getAllProductRecords();
                  }
                })
                .catch(function(data, status) {
                  console.error("Gists error", data);
                });
           }
           else{
             $scope.alertProductValidation = true;
             $scope.message = "Please enter the product price";
             $timeout(function() {
               $scope.alertProductValidation = false;
               $scope.message = "";
             }, 3000);
           }
         }
         else{
           $scope.alertProductValidation = true;
           $scope.message = "Please enter the product quantity";
           $timeout(function() {
             $scope.alertProductValidation = false;
             $scope.message = "";
           }, 3000);
         } 
        }
        else{
          $scope.alertProductValidation = true;
          $scope.message = "Please enter the product material name";
          $timeout(function() {
            $scope.alertProductValidation = false;
            $scope.message = "";
          }, 3000); 
        }

      }else{
        $scope.alertProductValidation = true;
        $scope.message = "Please enter the product name";
        $timeout(function(){
          $scope.alertProductValidation = false;
          $scope.message = '';
        },3000); 
      }
    };

    $scope.calculateUpdateProduct = function(index,quantity,price,totalPrice)
    {
     
      quantity = (quantity == undefined)? 0 : parseInt(quantity);
      price = (price == undefined)? 0 : parseFloat(price);
      totalUnitPrice = totalPrice == undefined ? 0 : parseFloat(totalPrice);
      $scope.getAllProductDetail[index].product_total_buying = (quantity * price).toFixed(2);
      $scope.getAllProductDetail[index].product_total = (quantity * totalUnitPrice).toFixed(2);
    };

    $scope.calculateUpdateProductUnit = function(index,quantity,price)
    {
     
      quantity = (quantity == undefined)? 0 : parseInt(quantity);
      price = (price == undefined)? 0 : parseFloat(price);
      
      $scope.getAllProductDetail[index].product_total = (quantity * price).toFixed(2);
    };

    $scope.changeQuanity = function(type,index){
      if(type == "unit")
      {
        $scope.productQuantityArray[index].productQuantity = 1;
        calculateProductPrice(
          index,
          $scope.productQuantityArray[index].productQuantity,
          $scope.productQuantityArray[index].productUnitPrice
        );
      }else{
        $scope.productQuantityArray[index].productQuantity = 1;
        calculateProductPrice(
          index,
          $scope.productQuantityArray[index].productQuantity,
          $scope.productQuantityArray[index].productUnitPrice
        );
      }
    };

    var getAllInventoryRecords = function()
    {
      $scope.billingLoader = true;
      $http
        .get(
          $rootScope.url +
            "API/userRecordsOperation.php?apikey=axAypZhfghsksib264875ndjkflrflhnAdjZdcon67gdjb&method=fetchInventory"
        )
        .then(function(response) {
          if (response.data.status == "success") {
            $scope.billingLoader = false;
            $scope.inventoryDetails = response.data.data;
          } else {
            $scope.billingLoader = false;
            $scope.inventoryDetails = [];
          }
        })
        .catch(function(data, status) {
          console.error("Gists error", data);
        });
    };
    /********************************************************END******************************************************************************** */
  }
]);
  