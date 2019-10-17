app.factory('AddTextReportModule', ['$rootScope', function($rootScope){
    var isTextRportLoaded = false,
      textLoadedData = [],
      isDataSet = function(){
          return isTextRportLoaded;
      },
      setTextData = function(data)
      {
          if(typeof data !== 'undefined' && data.length > 0)
          {
              textLoadedData = data;
              isTextRportLoaded = true;
          }else{
              textLoadedData = '';
              isTextRportLoaded = false;
          }
      },
      getTextData = function()
      {
          return textLoadedData;
      },
      resetData = function()
      {
         textLoadedData.pop();
      }; 
      return {
        isDataSet: isDataSet,
        setTextData: setTextData,
        getTextData: setTextData,
        resetData: setTextData
      };
}]);