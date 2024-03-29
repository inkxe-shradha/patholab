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
          $rootScope.$emit("TEXTDATA_LOADED_EVENT", textLoadedData);
      },
      getTextData = function()
      {
          return textLoadedData;
      },
      resetData = function()
      {
         textLoadedData = [];
      }; 
      return {
        isDataSet: isDataSet,
        setTextData: setTextData,
        getTextData: getTextData,
        resetData: resetData
      };
}]);