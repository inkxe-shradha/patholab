app.factory('DashBoardService', ["$http", "$rootScope", function($http, $rootScope) {
     var rootUrl = $rootScope.rootUrl,
       Key = $rootScope.Key,
       logOut = function(userDetails, userid) {
         var _serializedData = $.param({
           apikey: Key
         });

         var _response = $http({
           method: "POST",
           url: rootUrl + "userLogin/logOut",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded"
           },
           data: _serializedData
         });
         return _response;
       };
        return {
            logOut : logOut
        };
}]);