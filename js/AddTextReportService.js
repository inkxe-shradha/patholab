app.factory('AddTextReportService', ["$http", "$rootScope", function($http, $rootScope) {
     var rootUrl = $rootScope.rootUrl,
         key = $rootScope.Key,
         loadAllTextData = function()
         {
            console.log(rootUrl);
           $http.get(rootUrl+'textReport/getallRecord?apiKey='+key).then(function(data) {
             console.log(data);
           }).catch(function(data, status) {
                console.error("Gists error", data);
           });
       }; 
       return {
         loadAllTextData: loadAllTextData
       };
}]);