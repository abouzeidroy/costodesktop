(function (){
	'use strict';
	costo_app.controller('homepage_controller', ['$scope','$timeout','$q','costo_services', '$location','cart_services', 'storage_services',
		function($scope, $timeout, $q, costo_services, $location, cart_services, storage_services) {
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
					//alert('No more products to load');
					deferred.reject();
				});
				return deferred.promise;
			}

			function get_homepage_categories(){
				var deferred = $q.defer();
				costo_services.get_categories().then(function(response){
					$scope.categories = response;
					deferred.resolve();
				}, function(){
					deferred.reject();
				});
				return deferred.promise;
			}
			
			init();

			function sub_cats(){
				var sub_cats_array = {
					ids:[]
				};
				angular.forEach($scope.categories, function(category){
					if($scope.parent_category_filter(category)){
						sub_cats_array.ids.push(category.id);
					}
				})
				console.log(sub_cats_array);
				return sub_cats_array;
			}
			
			$scope.filter_by_category = function(category){
				if(category.parent == 0){
					$scope.parent_cat_id = category.id;
					$scope.parent_category = category;
					var get_sub_cats = sub_cats();
					var get_sub_cats_ids = get_sub_cats.ids.join();
					$scope.products_params.product_cat = get_sub_cats_ids;
				}else{
					$scope.parent_cat_id = category.id;
					$scope.products_params.product_cat = category.id;
				};
				$location.search('category', encodeURI(category.name));
				$scope.products_params.page = 1;
				$scope.products = [];
				get_homepage_products()
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

			$scope.parent_category_filter = function(item){
				return item.parent == $scope.parent_category.id
			}

			$scope.cart = storage_services.get_cookie('cart');
			$scope.add_to_cart = function(product, quantity){
				var item_object = {
					name: product.title.rendered,
					price: product._price,
					image: '',
					id: product.id
				}
				if(product.better_featured_image && product.better_featured_image.source_url){
					item_object.image = product.better_featured_image.source_url;
				}
				//console.log(item);
				cart_services.add_to_cart(item_object, quantity);
				$timeout(function(){
					$scope.cart = storage_services.get_cookie('cart');
				}, 500)
			}

			$scope.available_in_cart = function(product_id){
				return get_row_id($scope.cart.items, 'id', product_id) != '-1';
			}

			$scope.product_quantity = function(product_id){
				var get_row_item_id = get_row_id($scope.cart.items, 'id', product_id);
				return $scope.cart.items[get_row_item_id].quantity;
			}

		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/