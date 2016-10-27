var ProjectName = window.ProjectName = window.ProjectName || {};

ProjectName.MessagePage = function(){
	var GetMessage = function(ReactInstance, callback){

		ProjectName.Utilities.SendRequest({
			url: '/api/data',
			method: 'GET'
		}, callback, ReactInstance)
	};

	return {
		GetMessage : GetMessage
	};
}();