(function (){
	'use strict';
	costo_app.controller('homepage_controller', ['$scope','$timeout','$debounce','$q','costo_services', '$location','cart_services', 'storage_services', 'Notification','$routeParams', '$filter',
		function($scope, $timeout, $debounce, $q, costo_services, $location, cart_services, storage_services, Notification, $routeParams, $filter) {
			$scope.page_loading = true;

			$scope.products_params = {
				category:'',
				page:1,
				per_page:50,
				search: ''
			}
			$scope.reached_end = false;

			$scope.search = {
				search_key : ''
			}
			$scope.controller_initiated = false;
			function init(){
				var deferred = $q.defer();
				// Get Categories
				if($routeParams.category){
					get_homepage_categories().then(function(){
						var get_cat = $filter('filter')($scope.categories, function(item){
							return $routeParams.category == item.slug.replace(/[0-9]/g, '').substring(1);
						}, true)[0];
						$scope.products_params.category = get_cat.id;
						$scope.parent_cat_id = get_cat.id;
						$scope.parent_category = get_cat;
						get_homepage_featured().then(function(){
							get_homepage_products().then(function(){
								$scope.controller_initiated = true;
								deferred.resolve();
							})
						})
					});
				}else{
					// Return a promise
					get_homepage_featured().then(function(){
						get_homepage_categories();
						get_homepage_products().then(function(){
							$scope.controller_initiated = true;
							deferred.resolve();
						});
					});
				};
				return deferred.promise;
			}

			$scope.filters = {
				category_id:0
			}
			$scope.products = [];
			
			function get_homepage_products(){
				console.trace();
				var deferred = $q.defer();
				$scope.products_loading = true;
				costo_services.get_products($scope.products_params).then(function(response){
					$scope.products = $scope.products.concat(response);
					$scope.products_loading = false;
					if(response.length == 0 || response.length < $scope.products_params.per_page){
						$scope.reached_end = true;
					}
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
				$scope.categories_loading = true;
				costo_services.get_categories().then(function(response){
					$scope.categories = response;
					$scope.categories_loading = false;
					deferred.resolve();
				}, function(){
					deferred.reject();
				});
				return deferred.promise;
			}
			
			function get_homepage_featured(){
				var deferred = $q.defer();
				$scope.products_loading = true;
				var by_cats = angular.copy($scope.products_params);
				by_cats.tag = 114;
				costo_services.get_products(by_cats).then(function(response){
					$scope.products = $scope.products.concat(response);
					$scope.products_loading = false;
					// if(response.length == 0){
					// 	$scope.reached_end = true;
					// }
					deferred.resolve();
				}, function(){
					$scope.products_loading = false;
					//$scope.reached_end = true;
					//alert('No more products to load');
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
				return sub_cats_array;
			}
			
			$scope.filter_by_category = function(category){
				$scope.search.search_key = '';
				$scope.products_params.search = '';
				$scope.parent_cat_id = category.id;
				$scope.parent_category = category;
				$scope.products_params.category = $scope.parent_cat_id;
				$scope.products_params.page = 1;
				$scope.products = [];
				$scope.reached_end = false;
				get_homepage_featured().then(function(){
					get_homepage_products()
				})
				var slug_trimmed = category.slug.replace(/[0-9]/g, '').substring(1);
				$location.path('/' + slug_trimmed, false);
			}

			$scope.product_filters = function(item){
				var product_found = false;
				if(is_in_array($scope.filters.category_id, item.category) || $scope.filters.category_id == 0){
					product_found = true;
				}
				return product_found;
			};

			$scope.next_page_load = function(){
				if(!$scope.reached_end && !$scope.products_loading && $scope.controller_initiated){
					$scope.products_params.page += 1;
					get_homepage_products();
				}
			}

			$scope.parent_category_filter = function(item){
				if(item != 'undefined' && $scope.parent_category){
					return  item.parent == $scope.parent_category.id
				}
			}


			$scope.cart = storage_services.get_object_cookie('cart');
			if(!$scope.cart){
				$scope.cart = {
					items: [],
					regular_price:0
				}
			};
			function getUrlParameter(name) {
				name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
				var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
				var results = regex.exec(location.search);
				return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
			};

			$scope.store_cart_trigger = function(){
				$debounce(store_cart, 1000);
			};

			var store_cart = function() {
				storage_services.set_object_cookie('cart', $scope.cart);
			};

			$scope.changed_search_input = function(){
				$debounce(start_search, 400);
			}

			var start_search = function(){
				$scope.products_params.search = angular.copy($scope.search.search_key);
				$scope.products_params.page = 1;
				$scope.products = [];
				$scope.reached_end = false;
				$scope.reset_category_selection();
				get_homepage_products();
			};

			$scope.$watch('search.search_key', function(){
				if($scope.search.search_key != ''){
					$scope.changed_search_input();
				};
			})

			$scope.reset_category_selection = function(){
				$location.path('/', false);
				$scope.parent_category = '';
				$scope.products_params.category = '';
			};

			$scope.reset_search_criterias = function(){
				$scope.products_params.page = 1;
				$scope.products = [];
				$scope.reached_end = false;
				$scope.search.search_key = '';
			}
			
			
			$scope.add_to_cart = function(product, quantity, from_cart){
				product.loading = true;
				if(from_cart){
					var item_object = {
						name: product.name,
						regular_price: product.regular_price,
						image: '',
						id: product.id
					}
				}else{
					var item_object = {
						name: product.name,
						regular_price: product.regular_price,
						image: '',
						id: product.id
					}
				}
				if(product.images && product.images[0].src){
					item_object.image = product.images[0].src;
				}
				var get_row_index = get_row_id($scope.cart.items, 'id', item_object.id);
				$scope.cart.regular_price += parseInt(item_object.regular_price)*quantity;
				if(get_row_index != '-1'){
					$scope.cart.items[get_row_index].quantity += quantity
					if($scope.cart.items[get_row_index].quantity == 0){
						$scope.cart.items.splice(get_row_index, 1);
					}
				}else{
					item_object.quantity = quantity;
					$scope.cart.items.unshift(item_object);
				};
				$scope.store_cart_trigger();
			}

			$scope.available_in_cart = function(product_id){
				if($scope.cart && $scope.cart.items && $scope.cart.items.length > 0){
					return get_row_id($scope.cart.items, 'id', product_id) != '-1';
				}else{
					return false;
				}
			}

			$scope.product_quantity = function(product_id){
				if($scope.cart && $scope.cart.items && $scope.cart.items.length > 0){
					var get_row_item_id = get_row_id($scope.cart.items, 'id', product_id);
					if(get_row_item_id != '-1'){
						return $scope.cart.items[get_row_item_id].quantity;
					}
				}
			}

			$scope.empty_cart = function(){
				$scope.cart = {
					items: [],
					regular_price:0
				}
				store_cart();
			}
			$scope.guest = {
				phone_number:'',
				name:''
			}

			$scope.reset_screen_and_empty_cart = function(){
				$scope.show_form = false;
				//$scope.order_message = '';
				$scope.visibleCart = false;
				$scope.reset_category_selection();
				$scope.reset_search_criterias();
				get_homepage_products();
				$timeout(function(){
					$scope.empty_cart();
				}, 2000)
			}
			$scope.form_valid = function(){
				var valid = true;
				if($scope.guest.phone_number == '' || $scope.guest.name == ''){
					valid = false;
				}
				return valid;
			}
			$scope.create_order = function(){
				if(!$scope.form_valid()){
					Notification.error('Fields are required')
					return false;
				}
				var cart_items = [];
				angular.forEach($scope.cart.items, function(item){
					var order_item = {
						product_id: item.id,
						quantity: item.quantity
					}
					cart_items.push(order_item)
				})
				$scope.submitting_order = true;
				costo_services.post_order(cart_items, $scope.guest).then(function(data){
					$scope.order_message = 'Your order has been successfully placed, please contact us on 70593163 for any inquiries'
					$scope.submitting_order = false;
					$scope.empty_cart();
					$timeout(function(){
						$scope.order_message = '';
						$scope.visibleCart = false;
						$scope.reset_category_selection();
						$scope.reset_search_criterias();
						$timeout(function(){
							$scope.show_form = false;

						}, 2000)
					}, 4000)
				}, function(){
					$scope.order_message = 'Something went wrong'
					$scope.submitting_order = false;
				});
			};

		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/