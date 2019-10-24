app.factory('PatientsModule', ['$rootScope', function($rootScope){
    var isPatientDataLoaded = false,
      patientData = [],
      isDataSet = function(){
          return isPatientDataLoaded;
      },
      setPatientData = function(data)
      {
          if(typeof data !== 'undefined' && data.length > 0)
          {
              patientData = data;
              isPatientDataLoaded = true;
             
          }else{
              patientData = '';
              isPatientDataLoaded = false;
          }
          $rootScope.$emit("PATIENTDATA_LOADED_EVENT", patientData);
      },
      getPatientData = function()
      {
          return patientData;
      },
      resetData = function()
      {
         patientData.pop();
      }; 
      return {
        isDataSet: isDataSet,
        setPatientData: setPatientData,
        getPatientData: getPatientData,
        resetData: resetData
      };
}]);