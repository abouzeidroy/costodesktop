(function (){
	'use strict';
	costo_app.controller('homepage_controller', ['$scope','$timeout','$debounce','$q','costo_services', '$location','cart_services', 'storage_services', 'Notification',
		function($scope, $timeout, $debounce, $q, costo_services, $location, cart_services, storage_services, Notification) {
			$scope.page_loading = true;

			$scope.products_params = {
				product_cat:'',
				page:1,
				per_page:50,
				search: ''
			}
			$scope.reached_end = false;

			$scope.search = {
				search_key : ''
			}

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
				//if(category.parent == 0){
					$scope.parent_cat_id = category.id;
					$scope.parent_category = category;
					//var get_sub_cats = sub_cats();
					//var get_sub_cats_ids = get_sub_cats.ids[0];
					$scope.products_params.product_cat = $scope.parent_cat_id;
				// }else{
				// 	$scope.parent_cat_id = category.id;
				// 	$scope.products_params.product_cat = category.id;
				// };
				//$location.search('category', encodeURI(category.slug));
				$scope.products_params.page = 1;
				$scope.products = [];
				$scope.reached_end = false;
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
				if(!$scope.reached_end && !$scope.products_loading){
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
					price:0
				}
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
				$scope.parent_category = '';
				$scope.products_params.product_cat = '';
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
					console.log(product);
					var item_object = {
						name: product.name,
						price: product.price,
						image: '',
						id: product.id
					}
				}else{
					console.log(product);
					var item_object = {
						name: product.title.rendered,
						price: product._regular_price,
						image: '',
						id: product.id
					}
				}
				if(product.better_featured_image && product.better_featured_image.source_url){
					item_object.image = product.better_featured_image.source_url;
				}
				var get_row_index = get_row_id($scope.cart.items, 'id', item_object.id);
				console.log(item_object.price);
				console.log(quantity);
				console.log(parseInt(item_object.price)*quantity);
				$scope.cart.price += parseInt(item_object.price)*quantity;
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
					price:0
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
					console.log(data);
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
				console.log($scope.cart.items);
			};

		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/