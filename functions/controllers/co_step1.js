(function (){
	'use strict';
	ohmybox_app.controller('co_step1', ['$scope','$timeout','$q','omb_services','$filter','storage_services','$cookies','$location',
		function($scope, $timeout, $q, omb_services, $filter, storage_services, $cookies, $location) {
			if($cookies.getObject('personal_info')){
				$scope.page_values = $cookies.getObject('personal_info');
				console.log($scope.page_values);
			}else{
				$scope.page_values = {
					name: '',
					middle_name: '',
					family_name: '',
					gender: 0,
					email: '',
					username: '',
					password: ''
				};
			}
		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/