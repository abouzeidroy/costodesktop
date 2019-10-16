(function (){
	'use strict';
	costo_app.controller('main_controller', ['$scope','$timeout','$q','costo_services','$location', '$rootScope','$routeParams','$cookies','$translate',
		function($scope, $timeout, $q, costo_services, $location, $rootScope, $routeParams, $cookies, $translate) {
			$scope.iframeHeight = window.innerHeight;
			$scope.page_loading = true;
			
			function set_hash(hash) {
				window.location.hash = hash;
				//return true;
			}
			$scope.changeLanguage = function(lang){
				$cookies.put('language', lang)
			 	$translate.use(lang); 
			}
			
			$scope.do_logout = function(){
				$cookies.put('session_id', '');
				$cookies.putObject('personal_info', '')
				set_hash("#/");
			}
			
			
		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/