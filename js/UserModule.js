app.factory('UserModule', ['$rootScope', function($rootScope){
    var userDetailsArray = '',
        setUserDetails = function(data)
        {
            if(data)
            {
                userDetailsArray = data;
            }else{
                userDetailsArray = '';
            }
        },
        getUserDetails = function()
        {
            return userDetailsArray;
        }
    return {
        setUserDetails : setUserDetails,
        getUserDetails : getUserDetails
    };
}]);