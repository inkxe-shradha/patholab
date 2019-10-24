app.factory('PatientsService', ["$http", "$rootScope","PatientsModule", function($http, $rootScope,PatientsModule) {
     var rootUrl = $rootScope.rootUrl,
         key = $rootScope.Key,
         loadAllTextData = function()
         {
           $http.get(rootUrl+'textReport/getallPatientRecords?apiKey='+key).then(function(pRes) {
             if (pRes.data && pRes.data.status == "Success") {
               PatientsModule.setPatientData(pRes.data.data);
             } else {
               var data = [];
               PatientsModule.setPatientData(data);
             }
           }).catch(function(data, status) {
                console.error("Gists error", data);
           });
       },
       sendPatientData = function(patient)
       {
           var _params = $.param({
            apikey: key,
            patient_name: patient.pateintName,
            patient_number: patient.patientNumber,
            patient_age: patient.patientAge,
            patient_gender: patient.gender,
            patient_address: patient.address
           });
           var _response = $http({
             method: "POST",
             url: rootUrl + "textReport/setPatientData",
             headers: {
               "Content-Type": "application/x-www-form-urlencoded"
             },
             data: _params
           });
           return _response;
       },
       deleteRecord = function(id){
         var _response = $http.get(rootUrl+'textReport/deletePatient?apiKey='+key+'&patient_id='+id);
         return _response;
       }; 
       return {
         loadAllTextData: loadAllTextData,
         sendPatientData: sendPatientData,
         deleteRecord: deleteRecord
       };
}]);