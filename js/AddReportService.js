app.factory('AddReportService', ["$http", "$rootScope","AddReportModule", function($http, $rootScope,AddReportModule) {
     var rootUrl = $rootScope.rootUrl,
       key = $rootScope.Key,
       loadAllTextData = function() {
         $http
           .get(rootUrl + "textReport/getAllReportDetails?apiKey=" + key)
           .then(function(pRes) {
             if (pRes.data && pRes.data.status == "Success") {
               AddReportModule.setReportData(pRes.data.data);
             } else {
               var data = [];
               AddReportModule.setReportData(data);
             }
           })
           .catch(function(data, status) {
             console.error("Gists error", data);
           });
       },
       saveAllReportData = function(testArr) {
         var _params = $.param({
           apikey: key,
           test_array: JSON.stringify(testArr)
         });
         var _response = $http({
           method: "POST",
           url: rootUrl + "textReport/saveTestData",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded"
           },
           data: _params
         });
         return _response;
       },
       deleteTestData = function(id){
         var _response = $http.get(
           rootUrl + "textReport/deleteTestData?apiKey=" + key + "&test_id="+id
         );
         return _response;
       }; 
       return {
         loadAllTextData: loadAllTextData,
         saveAllReportData: saveAllReportData,
         deleteTestData: deleteTestData
       };
}]);