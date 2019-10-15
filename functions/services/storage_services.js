(function() {
	'use strict';
	ohmybox_app.factory('storage_services', ['$cookies',
		function($cookies) {
			return {
				set_object_cookie:function(key, value){
					//console.log(value);
					$cookies.putObject(key, value);
					console.log($cookies.getObject(key));
				},
				set_cookie:function(key, value){
					//console.log(value);
					$cookies.put(key, value);
					console.log($cookies.get(key));
				},
				get_cookie:function(key){
					console.log($cookies.get(key));
				},
				get_object_cookie:function(key){
					console.log($cookies.getObject(key));
				}
			};
		}
	]);
})();
