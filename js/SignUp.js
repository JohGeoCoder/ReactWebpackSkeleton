var ProjectName = window.ProjectName = window.ProjectName || {};

ProjectName.SignupModule = function(){
	var SubmitSignup = function(ReactInstance, Signup, callback){

		ProjectName.Utilities.SendRequest({
			url: '/api/signup',
			method: 'POST',
			data: Signup
		}, callback, ReactInstance);
	};

	return {
		SubmitSignup : SubmitSignup
	};
}();