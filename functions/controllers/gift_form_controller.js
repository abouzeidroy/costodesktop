(function (){
	'use strict';
	costo_app.controller('gift_form_controller', ['$scope','$timeout','$q','costo_services','$filter','storage_services','$cookies','$location','Notification',
		function($scope, $timeout, $q, costo_services, $filter, storage_services, $cookies, $location, Notification) {
			$scope.cookie_session = $cookies.get('session_id');
			if($cookies.getObject('personal_info')){
				$scope.page_values = $cookies.getObject('personal_info');
			}else{
				$scope.page_values = {
					step: 2,
					passed_step: 2,
					type: 0,//0 for yourself, 1 a gift
					name: '',
					age: '',
					gender: 0,
					city: '',
					categories: [],
					budget: '',
					preferences: '',
					occasion: ''
				};
			}
			
			$scope.login = {
				email: '',
				password: ''
			};
			
			
			$scope.ddGenderSelector = [
				{
					text: 'Male',
					value: 1
				},
				{
					text: 'Female',
					value: 2
				},
				{
					text: 'Unisex',
					value: 3
				},
				{
					text: 'Couple',
					value: 4
				}
			];
			
			$scope.personal_info = {};
			$scope.budget_form = {};
			$scope.selected_categories = [];
			
			$scope.show_gender_dropdown_value = $scope.invalid_name = $scope.invalid_age = $scope.required_gender = $scope.invalid_city = $scope.choose_cats_required = $scope.changed_gender = $scope.invalid_gender = $scope.form1_valid = false;
			$scope.toggle_gender_dropdown = function(){
				$scope.show_gender_dropdown_value = !$scope.show_gender_dropdown_value;
			};
			$scope.set_form_valid = function(){
				$scope.dirtyGender = true;
				$scope.form1_valid = true;
				$scope.invalid_budget = false;
				$scope.choose_cats_required = true;
			}
			
			
			$scope.page_loading = true;
			function init(){
				var deferred = $q.defer();
				// Get Categories
				var promise1 = get_categories();
				// Return a promise
				$q.all([promise1]).then(function(){
					// All promises are loaded 
					if($cookies.getObject('personal_info')){
						$scope.set_form_valid();
					}
					deferred.resolve();
				});
				return deferred.promise;
			}
			
			function get_categories(){
				var deferred = $q.defer();
				costo_services.get_categories().then(function(response){
					$scope.categories = response.Data.Categories;
					deferred.resolve();
				}, function(){
					deferred.reject();
				});
				return deferred.promise;
			}
			
			init();
			
			$scope.switch_type = function(value){
				$scope.page_values.type=value;
				$scope.page_values.step = 3;
				if($scope.page_values.passed_step<3){
					$scope.page_values.passed_step = 3;
				}
			};
			$scope.switch_step = function(value){
				$scope.page_values.step = value;
			};
			
			$scope.validate_budget = function(){
				$scope.invalid_budget = false;
				if(!angular.isNumber($scope.page_values.budget) || parseInt($scope.page_values.budget) < 0){
					$scope.invalid_budget = true;
				}else{
					$scope.invalid_budget = false;
				}
			};
			$scope.dirtyGender = false;
			$scope.setGenderDirty = function(selected){
				console.log(selected);
				$scope.dirtyGender = true;
			};
			
			$scope.validate_info = function(value){
				//var $form = personal_info
				if(!value || !$scope.dirtyGender){
					$scope.personal_info.Name.$dirty = true;
					$scope.personal_info.Age.$dirty = true;
					$scope.personal_info.City.$dirty = true;
					$scope.personal_info.Preferences.$dirty = true;
					$scope.personal_info.Occasion.$dirty = true;
					$scope.dirtyGender = true;
				}else{
					$scope.page_values.step ++;
					$scope.page_values.passed_step ++;
					$scope.form1_valid = true;
					//if($scope.page_values.step==6)
				}
			};
			
			
			$scope.found_in_selected_cats = function(item){
				var found = false;
				if($filter('filter')($scope.page_values.categories, {ID : item.ID}, true).length>0){
					found = true;
				}
				return found;
			};
			
			$scope.toggle_selected_cat = function(item){
				if($filter('filter')($scope.page_values.categories, item, true).length>0){
					console.log($filter('filter')($scope.page_values.categories, item, true));
					var get_index = $scope.page_values.categories.indexOf(item);
					console.log(get_index);
					$scope.page_values.categories.splice(get_index, 1);
				}else{
					if($scope.page_values.categories.length==4){
						Notification.error('You can only select up to 4 categories');
						//alert('You can only select up to 4 categories');
					}else{
						$scope.page_values.categories.push(item);
					}			
				}
				
				$scope.build_categories_array();
			};
			
			$scope.build_categories_array = function(){
				$scope.cats_array = [];
				angular.forEach($scope.page_values.categories, function(value, index){
					$scope.cats_array.push(value.ID);
				});
			};
			
			$scope.choose_cats = function(){
				if($scope.page_values.categories.length>0){
					$scope.page_values.step ++;
					$scope.page_values.passed_step ++;
					$scope.choose_cats_required = false;
				}else{
					$scope.choose_cats_required = true;
				}
			};
			
			$scope.set_budget = function(){
				$scope.budget_form.Budget.$setDirty();
				$scope.validate_budget();
				if($scope.invalid_budget === false || $scope.page_values.budget != 0){
					$scope.invalid_budget = false;
					$scope.page_values.step ++;
					$scope.page_values.passed_step ++;
					console.log($scope.page_values)
					$scope.store_data()
				}
			};
			
			$scope.do_login = function(){
				$scope.choose_cats()
				console.log($scope.form1_valid);
				console.log($scope.invalid_budget);
				console.log($scope.choose_cats_required);
				if($scope.form1_valid == true && !$scope.invalid_budget && !$scope.choose_cats_required){
					costo_services.do_login($scope.login.email, $scope.login.password).then(function(response){
						$cookies.putObject('box_options', $scope.page_values);
						$cookies.put('session_id', response.Session);
						if(response.Status == 1){
							Notification.success(response.Message);
							$scope.build_categories_array()
							costo_services.create_shopping_cart($scope.page_values.budget, 1, $scope.page_values.age, $scope.page_values.city, $scope.page_values.gender.value, $scope.page_values.preferences, $scope.page_values.occasion, $scope.cats_array).then(function(response){
								if(response.Status == 1){
									Notification.success(response.Message);
									$scope.page_values.cardId = response.AddedItemID;
									$scope.store_data();
									$location.path('/checkout1');
								}else{
									Notification.error(response.Message);
								}
							});
						}else{
							Notification.error(response.Message);
						}
					});
				}
			};
			
			$scope.store_data = function(){
				storage_services.set_object_cookie('personal_info', $scope.page_values);
			};
			
			$scope.register = function(){
				//$location.path('/register');
			};
		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/