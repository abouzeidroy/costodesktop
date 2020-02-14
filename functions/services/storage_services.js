(function() {
	'use strict';
	costo_app.factory('storage_services', ['$cookies',
		function($cookies) {
			return {
				set_object_cookie:function(key, value){
					$cookies.putObject(key, value);
				},
				set_cookie:function(key, value){
					$cookies.put(key, value);
				},
				get_cookie:function(key){
					if($cookies.get(key)){
						return JSON.parse($cookies.get(key));
					}else{
						return '';
					}
				},
				get_object_cookie:function(key){
					return $cookies.getObject(key);
				}
			};
		}
	]);
})();
