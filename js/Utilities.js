var ProjectName = window.ProjectName = window.ProjectName || {};

ProjectName.Utilities = function(){
	var SendRequest = function(o, callback, ReactInstance){
		var options = extend(true, {
			url: '',
			method: 'GET',
			data: {}
		}, o)

		var isCallbackFunction = callback && {}.toString.call(callback) === '[object Function]'

		var xhr = new XMLHttpRequest();

		if(ReactInstance)
	    	ReactInstance.serverRequest = xhr;

	    xhr.onreadystatechange = function () {
	      var DONE = 4; // readyState 4 means the request is done.
	      var OK = 200; // status 200 is a successful return.
	      if (xhr.readyState === DONE) {
	        if (xhr.status === OK) {
	          var response = JSON.parse(xhr.responseText);
	          if(isCallbackFunction){
	          	callback(response);
	          }
	          
	        } else {
	          // An error occurred during the request.
	          console.log('Error: ' + xhr.status);
	          if(isCallbackFunction){
				callback({
					error: xhr.responseText
				})
	          }
	          
	        }
	      }
	    }

	    xhr.open(options.method, options.url);
	    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
	    xhr.send(JSON.stringify(options.data));
	}

	return {
		SendRequest: SendRequest
	}
}()

//https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
var extend = function () {

    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    // Check if a deep merge
    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
        deep = arguments[0];
        i++;
    }

    // Merge the object into the extended object
    var merge = function (obj) {
        for ( var prop in obj ) {
            if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
                // If deep merge and property is an object, merge properties
                if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
                    extended[prop] = extend( true, extended[prop], obj[prop] );
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
        var obj = arguments[i];
        merge(obj);
    }

    return extended;

};