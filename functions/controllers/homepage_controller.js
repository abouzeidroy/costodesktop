(function (){
	'use strict';
	costo_app.controller('homepage_controller', ['$scope','$timeout','$q','costo_services',
		function($scope, $timeout, $q, costo_services) {
			$scope.page_loading = true;

			$scope.products_params = {
				product_cat:'',
				page:1,
				per_page:40
			}
			$scope.reached_end = false;

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
			$scope.products = [];
			
			function get_homepage_products(){
				var deferred = $q.defer();
				$scope.products_loading = true;
				costo_services.get_products($scope.products_params).then(function(response){
					$scope.products = $scope.products.concat(response);
					$scope.products_loading = false;
					deferred.resolve();
				}, function(){
					$scope.products_loading = false;
					$scope.reached_end = true;
					alert('No more products to load');
					deferred.reject();
				});
				return deferred.promise;
			}

			function get_homepage_categories(){
				var deferred = $q.defer();
				costo_services.get_categories().then(function(response){
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
				$scope.products_params.product_cat = category_id;
				$scope.products_params.page = 1;
				$scope.products = [];
				get_homepage_products()
				//$scope.filters.category_id = category_id;
			}

			$scope.product_filters = function(item){
				var product_found = false;
				if(is_in_array($scope.filters.category_id, item.product_cat) || $scope.filters.category_id == 0){
					product_found = true;
				}
				return product_found;
			};

			$scope.next_page_load = function(){
				if(!$scope.reached_end){
					$scope.products_params.page += 1;
					get_homepage_products();
				}
			}

		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/