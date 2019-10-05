app.factory('UserModule', ['$rootScope', function($rootScope){
    var userDetailsArray = '',
        isUserDataSet = false,
        setUserDetails = function(data)
        {
            if(data)
            {
                userDetailsArray = data;
                isUserDataSet    = true;
            }else{
                userDetailsArray = '';
                isUserDataSet    = false;
            }
        },
        getUserDetails = function()
        {
            return userDetailsArray;
        },
        iSUserDataSet = function()
        {
            return isUserDataSet;
        },
        resetUserDetails = function()
        {
            isUserDataSet = false;
            userDetailsArray = ''; 
        };
    return {
      setUserDetails: setUserDetails,
      getUserDetails: getUserDetails,
      iSUserDataSet: iSUserDataSet,
      resetUserDetails: resetUserDetails
    };
}]);