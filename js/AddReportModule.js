app.factory('AddReportModule', ['$rootScope', function($rootScope){
    var isreportDataLoaded = false,
      reportData = [],
      isDataSet = function(){
          return isreportDataLoaded;
      },
      setReportData = function(data)
      {
          if(typeof data !== 'undefined' && data.length > 0)
          {
              reportData = data;
              isreportDataLoaded = true;
             
          }else{
              reportData = '';
              isreportDataLoaded = false;
          }
          $rootScope.$emit("REPORT_DATA_LOADED", reportData);
      },
      getReportData = function()
      {
          return reportData;
      },
      resetData = function()
      {
         reportData = [];
      }; 
      return {
        isDataSet: isDataSet,
        setReportData: setReportData,
        getReportData: getReportData,
        resetData: resetData
      };
}]);