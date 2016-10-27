var ProjectName = window.ProjectName = window.ProjectName || {};

ProjectName.LoginModule = function(){
	var currentlyLoggedInUser = null;

	var SubmitLogin = function(ReactInstance, Login, callback){

		ProjectName.Utilities.SendRequest({
			url: 'api/login',
			method: 'POST',
			data: Login
		}, callback, ReactInstance)

	};

	var GetLoginStatus = function(ReactInstance, callback){

		ProjectName.Utilities.SendRequest({
			url: 'api/getLoginStatus',
			method: 'GET',
		}, callback, ReactInstance)
	}

	var Logout = function(callback){

		ProjectName.Utilities.SendRequest({
			url: 'api/logout',
			method: 'GET'
		}, callback)
	}

	return {
		SubmitLogin : SubmitLogin,
		GetLoginStatus: GetLoginStatus,
		Logout: Logout
	};
}();