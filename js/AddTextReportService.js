app.factory('AddTextReportService', ["$http", "$rootScope","AddTextReportModule", function($http, $rootScope,AddTextReportModule) {
     var rootUrl = $rootScope.rootUrl,
         key = $rootScope.Key,
         loadAllTextData = function()
         {
           $http.get(rootUrl+'textReport/getallRecord?apiKey='+key).then(function(pRes) {
            if(pRes.data)
            {
              AddTextReportModule.setTextData(pRes.data);
            }else{
              var data = [];
              AddTextReportModule.setTextData(data);
            }
           }).catch(function(data, status) {
                console.error("Gists error", data);
           });
       }; 
       return {
         loadAllTextData: loadAllTextData
       };
}]);