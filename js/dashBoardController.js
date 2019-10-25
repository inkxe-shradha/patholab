angular.module('patholab').controller("DashBoardController", ["$scope", "$rootScope", "$http", "$interval", "$location", "$routeParams", "$timeout", "UserService","UserModule",'DashBoardService', function($scope, $rootScope, $http, $interval, $location, $routeParams, $timeout, UserService,UserModule,DashBoardService) {
    $scope.sideBarArray = [
      {
        name: "Dashboard",
        status: true,
        current: true,
        icons: "ti-home",
        color: "c-blue-500",
        htmlPage: "default"
      },
      {
        name: "Generate Report",
        status: true,
        current: false,
        icons: "ti-bar-chart",
        color: "c-brown-500",
        htmlPage: "addTextReport"
      },
      {
        name: "Add Patients",
        status: true,
        current: false,
        icons: "ti-pencil",
        color: "c-light-blue-500",
        htmlPage: "addPatients"
      },
      {
        name: "Add Report",
        status: true,
        current: false,
        icons: "ti-share",
        color: "c-deep-orange-500",
        htmlPage: "addReport"
      }
    ];
    var count = 0;
    $scope.module = $scope.sideBarArray[0];
    $scope.dashBoardLoader = true;
    $scope.init = function(){
        if(UserModule.iSUserDataSet())
        {
            $scope.dashBoardLoader = false;
            $scope.userDetails = UserModule.getUserDetails();
            count++;
        }else{
            checkSessionStatus();
        }
       setInterval(function(){
          checkSessionStatus();
       },120000);
       $location.search("param", null);
    };

    var checkSessionStatus = function()
    {
        UserService.checkLoginSession().then(function(pRes){
            $scope.dashBoardLoader = false;
            if(pRes.data && pRes.data.status == "success")
            {
                UserModule.setUserDetails(pRes.data.data);
                if(count > 0) $scope.userDetails = UserModule.getUserDetails();
            }else if(pRes.data.status == "Expired"){
                $location.path("/").search({ param: "false" });
            }else if(pRes.data.status == "Failed"){
                $location.path("/").search({ param: "false" });
            }
        });
        count++;
    };

    $scope.logOut = function()
    {
        DashBoardService.logOut().then(function(pRes){
            if(pRes.data.status == 'success'){
                UserModule.resetUserDetails();
                $location.path("/");
            }
        });
    };

    $scope.changeTab = function(tabDetails){
        angular.forEach($scope.sideBarArray, function(value, key) {
            if(tabDetails.name == $scope.sideBarArray[key].name)
            {
                $scope.sideBarArray[key].current = true;
                $scope.module = tabDetails;
                $scope.moduleName();
            }else{
                $scope.sideBarArray[key].current = false;
            }
        });
    }; 

    $scope.moduleName =function(){
        return $scope.module.htmlPage +'.html';
    }; 
}]);