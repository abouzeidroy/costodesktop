(function (){
	'use strict';
	ohmybox_app.controller('homepage_controller', ['$scope','$timeout','$q','omb_services',
		function($scope, $timeout, $q, omb_services) {
			$scope.page_loading = true;
			function init(){
				var deferred = $q.defer();
				// Get Categories
				var promise1 = get_homepage_products();
				var promise2 = get_homepage_categories();
				// Return a promise
				$q.all([promise1, promise2]).then(function(){
					// All promises are loaded 
					deferred.resolve();
				});
				return deferred.promise;
			}

			$scope.filters = {
				category_id:0
			}
			
			function get_homepage_products(){
				var deferred = $q.defer();
				omb_services.get_products().then(function(response){
					$scope.products = response;
					console.log($scope.products)
					deferred.resolve();
				}, function(){
					deferred.reject();
				});
				return deferred.promise;
			}

			function get_homepage_categories(){
				var deferred = $q.defer();
				omb_services.get_categories().then(function(response){
					$scope.categories = response;
					console.log($scope.homepage_data)
					deferred.resolve();
				}, function(){
					deferred.reject();
				});
				return deferred.promise;
			}
			
			init();
			
			$scope.filter_by_category = function(category_id){
				$scope.filters.category_id = category_id;
			}

			$scope.product_filters = function(item){
				var product_found = false;
				if(is_in_array($scope.filters.category_id, item.product_cat) || $scope.filters.category_id == 0){
					product_found = true;
				}
				return product_found;
			};
		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/