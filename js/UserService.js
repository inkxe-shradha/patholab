app.factory('UserService', ["$http", "$rootScope", function($http, $rootScope) {
    var rootUrl = $rootScope.rootUrl,
        Key = $rootScope.Key,
        userLogIn = function(userDetails,userid) {
            var _serializedData = $.param({
                apikey: Key,
                email: userDetails.username,
                password: userDetails.password,
                userId:userid
            });

            var _response = $http({
                method: "POST",
                url: rootUrl + "userLogin/logIn",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: _serializedData
            });
            return _response;
        },
        signUpUser = function(user) {
            var _serializedData = $.param({
                apikey: Key,
                username: user.username,
                email: user.email,
                password: user.password
            });

            var _response = $http({
                method: "POST",
                url: rootUrl + "userLogin/signUp",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: _serializedData
            });
            return _response;
        },
        checkLoginSession = function()
        {
            var _serializedData = $.param({
                apikey: Key,
            });

            var _response = $http({
                method: "POST",
                url: rootUrl + "userLogin/checkSessionStatus",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: _serializedData
            });
            return _response;
        };
    return {
        userLogIn: userLogIn,
        signUpUser: signUpUser,
        checkLoginSession:checkLoginSession
    };
}]);