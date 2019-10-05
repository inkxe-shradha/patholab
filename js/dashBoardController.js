angular.module('patholab').controller("DashBoardController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout", "UserService","UserModule", function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout, UserService,UserModule) {
    $scope.sideBarArray = [
        {
            name: "Dashboard",
            status: true,
            current: true,
            icons: "ti-home",
            color: "c-blue-500"
        },
        {
            name: "Add Test Report",
            status: true,
            current: false,
            icons: "ti-bar-chart",
            color: "c-brown-500"
        },
    ];
    $scope.dashBoardLoader = true;
    $scope.init = function(){
       checkSessionStatus();
       setInterval(function(){
          checkSessionStatus();
       },120000);
    };

    var checkSessionStatus = function()
    {
        UserService.checkLoginSession().then(function(pRes){
            $scope.dashBoardLoader = false;
            if(pRes.data && pRes.data.status == "success")
            {
                UserModule.setUserDetails(pRes.data);
            }else if(pRes.data.status == "Expired"){
                $location.path("/").search({ param: "false" });
            }else if(pRes.data.status == "Failed"){
                $location.path("/").search({ param: "false" });
            }
        });
    };
}]);