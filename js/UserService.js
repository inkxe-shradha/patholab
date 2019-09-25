app.factory('UserService', ["$http","$rootScope", function($http,$rootScope) {
  var rootUrl = "http://patholab.doctor.com/API/",
    Key = "APKEYRBDUFFUE2786287GFEWFFQUFQG38847KK09BCM",
    userLogIn = function(userDetails) {
      var _serializedData = $.param({
        apikey: Key,
        reqmethod: "updatePassword",
        email: userDetails.username,
        password: userDetails.password
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
    signUpUser = function(user){
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
    };
      return {
        userLogIn: userLogIn,
        signUpUser: signUpUser
      };
}]);