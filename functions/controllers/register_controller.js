(function (){
	'use strict';
	costo_app.controller('register_controller', ['$scope','$timeout','$q','costo_services','$filter','storage_services','$cookies','$location','Notification',
		function($scope, $timeout, $q, costo_services, $filter, storage_services, $cookies, $location, Notification) {
			if($cookies.getObject('personal_info')){
				console.log($cookies.getObject('personal_info'));
				$scope.page_values = $cookies.getObject('personal_info');
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
		
			
			/*$scope.billing_info = {
				"Address": "",
				"Building": "",
				"City": "",
				"CityID": 0,
				"CountryID": 0,
				"Email": "",
				"ID": 0,
				"Name": "",
				"Phone": "",
				"Street": ""
			};
			
			$scope.delivery_info = {
				"Address": "",
				"Building": "",
				"City": "",
				"CityID": 0,
				"CountryID": 0,
				"Email": "",
				"ID": 0,
				"Name": "",
				"Phone": "",
				"Street": ""
			};*/			
			$scope.billing_info = {
				"Address": "Address",
				"Building": "Building",
				"City": "City",
				"CityID": 0,
				"CountryID": 243,
				"Email": "mail@mail.com",
				"ID": 0,
				"Name": "Raz",
				"Phone": "01111111",
				"Street": "Street"
			};
			
			$scope.delivery_info = {
				"Address": "Address",
				"Building": "Building",
				"City": "City",
				"CityID": 0,
				"CountryID": 243,
				"Email": "mail@mail.com",
				"ID": 0,
				"Name": "Raz",
				"Phone": "01111111",
				"Street": "Street"
			};
			
			$scope.same_as_billing = false;
			
			$scope.login = {
				email: '',
				password: ''
			}
			
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
			$scope.selected_categories = []
			
			$scope.show_gender_dropdown_value = $scope.invalid_name = $scope.invalid_age = $scope.required_gender = $scope.invalid_city = $scope.choose_cats_required = $scope.changed_gender = $scope.invalid_gender = $scope.form1_valid = false;
			$scope.toggle_gender_dropdown = function(){
				$scope.show_gender_dropdown_value = !$scope.show_gender_dropdown_value;
			};
			
			$scope.page_loading = true;
			function init(){
				var deferred = $q.defer();
				// Get Categories
				var promise1 = get_countries();
				// Return a promise
				$q.all([promise1]).then(function(){
					// All promises are loaded 
					deferred.resolve();
				});
				return deferred.promise;
			}
			
			function get_countries(){
				var deferred = $q.defer();
				costo_services.get_countries().then(function(response){
					$scope.countries = response.Data.Countries;
					console.log($scope.countries);
					angular.forEach($scope.countries, function(value, key){
						//value.text = value.Title;
						//value.value = value.Value;
					});
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
			}
			
			$scope.switch_step = function(value){
				$scope.page_values.step = value;
			}
			
			$scope.validate_info = function(form_name){
				$scope.personal_info.Name.$setDirty();
				$scope.personal_info.Age.$setDirty();
				$scope.personal_info.City.$setDirty();
				$scope.personal_info.Preferences.$setDirty();
				$scope.personal_info.Occasion.$setDirty();
				$scope.validate_name();
				$scope.validate_age();
				$scope.validate_city();
				$scope.validate_preferences();
				$scope.validate_occasion();
				if($scope.page_values.gender == 'Gender'){
					$scope.changed_gender = true;
					$scope.switch_gender('Gender');
				}
				if($scope.invalid_name === false && $scope.invalid_age === false && $scope.invalid_city === false && $scope.invalid_gender === false && $scope.invalid_preferences === false && $scope.invalid_occasion === false){
					$scope.page_values.step ++;
					$scope.page_values.passed_step ++;
					$scope.form1_valid = true;
				}
			};
			
			$scope.store_data = function(){
				storage_services.set_object_cookie('personal_info', $scope.page_values);
			};
			
			$scope.matchBilling = function(){
				if($scope.same_as_billing){
					$scope.delivery_info = $scope.billing_info;
				}else{
					$scope.delivery_info = {
						"Address": "",
						"Building": "",
						"City": "",
						"CityID": 0,
						"CountryID": 0,
						"Email": "",
						"ID": 0,
						"Name": "",
						"Phone": "",
						"Street": ""
					};
				}
			}
			
			$scope.all_inputs = {
				"City": $scope.billing_info.City,
				"CityID": 1,
				"CountryID": $scope.billing_info.CountryID.ID,
				"DateOfBirth": "1989-05-14",
				"Email": $scope.page_values.email,
				"FirstName": $scope.page_values.name,
				"Gender": $scope.page_values.gender.value,
				"LastName": $scope.page_values.family_name,
				"MiddleName": $scope.page_values.middle_name,
				"Password":	$scope.page_values.password,
				"Phone": $scope.billing_info.Phone,
				"UserAgent": navigator.userAgent,
				"Latitude": 0,
				"Longtitude": 0,
				"NewAddress": {
					"Address": $scope.billing_info.Address,
					"Building": $scope.billing_info.Building,
					"City": $scope.billing_info.City,
					"CityID": 0,
					"CountryID": $scope.billing_info.CountryID.ID,
					"Email": $scope.page_values.email,
					"ID": 0,
					"Name": $scope.billing_info.Name,
					"Phone": $scope.billing_info.Phone,
					"Street": $scope.billing_info.Street,
					"UserAgent": navigator.userAgent
				}
			};
			
			$scope.submit_registration = function(value){
				console.log($scope.all_inputs);
				if(value){
					costo_services.register_user(
						$scope.billing_info.City,
						1,
						$scope.billing_info.CountryID.ID,
						"1989-05-14",
						$scope.page_values.email,
						$scope.page_values.name,
						$scope.page_values.gender.value,
						$scope.page_values.family_name,
						$scope.page_values.middle_name,
						$scope.page_values.password,
						$scope.billing_info.Phone,
						navigator.userAgent,
						0,
						0,
						$scope.billing_info.Address,
						$scope.billing_info.Building,
						$scope.billing_info.City,
						0,
						$scope.billing_info.CountryID.ID,
						$scope.page_values.email,
						0,
						$scope.billing_info.Name,
						$scope.billing_info.Phone,
						$scope.billing_info.Street,
						navigator.userAgent
					).then(function(response){
						//$cookies.putObject('box_options', $scope.page_values);
						if(response.Status == 1){
							Notification.success(response.Message);
							$cookies.put('session_id', response.Session);
							console.log($cookies.get('session_id'));
							if($scope.delivery_info.Name != ""){
								
								var address_object = {
									"Session": $cookies.get('session_id'),
									"UserAgent": navigator.userAgent,
									"NewAddress": {
										"Address": $scope.delivery_info.Address,
										"Building": $scope.delivery_info.Building,
										"City": $scope.delivery_info.City,
										"CityID": 0,
										"CountryID": $scope.delivery_info.CountryID.ID,
										"Email": $scope.page_values.email,
										"ID": 0,
										"Name": $scope.delivery_info.Name,
										"Phone": $scope.delivery_info.Phone,
										"Street": $scope.delivery_info.Street,
										"UserAgent": navigator.userAgent
									}
								}
								costo_services.put_address(address_object).then(function(response){
									if(response.Status == 1){
										Notification.success(response.Message);
										$timeout(function(){
											Notification.success('You will be redirected to the checkout');
											$timeout(function(){
												$location.path('/checkout1');
											}, 1000);
										}, 1000);
									}
								});
							};
							//costo_services.put_address
						}else{
						}
					});
				}else{
					$scope.register_info.Name.$dirty = true;
					$scope.register_info.family_name.$dirty = true;
					$scope.register_info.email.$dirty = true;
					$scope.register_info.password.$dirty = true;
					$scope.register_info.middle_name.$dirty = true;
					$scope.register_info.username.$dirty = true;
					$scope.register_info.match_password.$dirty = true;
					$scope.register_info.bill_address.$dirty = true;
					$scope.register_info.bill_city.$dirty = true;
					$scope.register_info.bill_name.$dirty = true;
					$scope.register_info.bill_street.$dirty = true;
					$scope.register_info.bill_building.$dirty = true;
					$scope.register_info.bill_phone.$dirty = true;
					$scope.register_info.deli_address.$dirty = true;
					$scope.register_info.deli_city.$dirty = true;
					$scope.register_info.deli_name.$dirty = true;
					$scope.register_info.deli_street.$dirty = true;
					$scope.register_info.deli_building.$dirty = true;
					$scope.register_info.deli_phone.$dirty = true;
				}
			};
		}
	]);
})();
			/*$('#fullpage').fullpage({
				navigation': false,
				navigationPosition': 'right',
				navigationTooltips': ['Categories', 'Video', 'New Arrivals', 'Latest Offers', 'Highlighted Products', 'Facebook Feeds']
			});*/