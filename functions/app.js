var costo_app = angular.module('costo_app', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngCookies', 'ngDropdowns', 'ui-notification', 'pascalprecht.translate', 'infinite-scroll'])
	.config(function($routeProvider, $locationProvider, $httpProvider, NotificationProvider) {
		//$httpProvider.defaults.withCredentials = true;
		'use strict';
		$routeProvider
			.when('/', {
				templateUrl: 'views/home_page.html',
				controller: 'homepage_controller'
			})
			.when('/gift_form', {
				templateUrl: 'views/gift_form.html',
				controller: 'gift_form_controller'
			})
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'register_controller'
			})
			.when('/checkout1', {
				templateUrl: 'views/co_step1.html',
				controller: 'co_step1'
			})
			.when('/checkout2', {
				templateUrl: 'views/co_step2.html',
				controller: 'co_step2'
			})
			.otherwise({
				redirectTo: '/dashboard',
				controller: 'dashboard_controller'
			});
		//$locationProvider.html5Mode(true);
	})
	.config(function(NotificationProvider, $translateProvider) {
		NotificationProvider.setOptions({
			delay: 10000,
			startTop: 20,
			startRight: 10,
			verticalSpacing: 20,
			horizontalSpacing: 20,
			positionX: 'left',
			positionY: 'bottom'
		});
		var en_translations = {
			"language" : "Selected Language English",
			"create_own_box" : "Create your own box",
			"footer_copyrights": "Oh My Box! © Oh My Box! © 2017. All rights reserved.  |  ",
			"the_box_is": "THE BOX IS",
			"for_yourself": "FOR YOURSELF",
			"a_gift": "A GIFT",
			"some_information_about": "SOME INFORMATION ABOUT",
			"yourself": " YOURSELF",
			"recepient": " THE RECEPIENT",
			"select_categories": "SELECT CATEGORIES",
			"categories_selected": "Categories selected",
			"at_least_one": "You must select at least one category",
			"set_budget": "SET BUDGET",
			"register_and_send": "REGISTER AND SEND",
			"already_a_member_log_in": "ALREADY A MEMBER, LOGIN",
			"sign_in": "Sign in",
			"email": "Email",
			"password": "Password",
			"forgot_password": "Forgot password",
			"confirm_password": "Confirm password",
			"not_yet_a_member": "NOT YET A MEMBER",
			"register": "Register",
			"register_text": "Register text",
			"personal_info": "Personal information",
			"billing_info": "Billing information",
			"delivery_info": "Delivery information",
			"subscribe_newsletter": "Subscribe to our newsletter",
			"shopping_cart": "Shopping Cart",
			"delivery_and_billing": "Delivery & Billing Address",
			"payment": "Payment",
			"your_shopping_total": "Your Shopping Total",
			"order_summary": "Order Summary",
			"next": "Next",
			"back_to_cart": "Back to cart",
			"name": "Name",
			"family_name": "Family Name",
			"middle_name": "Middle Name",
			"age": "Age",
			"city": "City",
			"occasion": "Occasion",
			"preferences": "Preferences",
			"gender": "Gender",
			"address": "Address",
			"address_name": "Address name",
			"username": "Username",
			"street": "Street",
			"phone": "Phone",
			"building": "Building",
			"delivery_address": "Delivery address",
			"choose_predefined": "Choose Predefined address",
			"add_new_one": "Or add a new one",
			"billing_address": "Billing address",
			"required_field": "Required Field",
			"budget_is_required": "Budget is required",
			"preferences_of_the_gift_recipient": "Preferences of the gift recipient",
			"checkout": "Checkout",
			"same_as_password": "and should be same as password"
		}

		var fr_translations = {
			"language" : "Selected Language French",
			"create_own_box" : "Create your own box fr",
			"footer_copyrights": "Oh My Box! © Oh My Box! © 2017. All rights reserved.  |   fr",
			"the_box_is": "THE BOX IS fr",
			"for_yourself": "FOR YOURSELF fr",
			"a_gift": "A GIFT fr",
			"some_information_about": "SOME INFORMATION ABOUT fr",
			"yourself": " YOURSELF fr",
			"recepient": " THE RECEPIENT fr",
			"select_categories": "SELECT CATEGORIES fr",
			"categories_selected": "Categories selected fr",
			"at_least_one": "You must select at least one category fr",
			"set_budget": "SET BUDGET fr",
			"register_and_send": "REGISTER AND SEND fr",
			"already_a_member_log_in": "ALREADY A MEMBER, LOGIN fr",
			"sign_in": "Sign in fr",
			"email": "Email fr",
			"password": "Password fr",
			"forgot_password": "Forgot password fr",
			"confirm_password": "Confirm password fr",
			"not_yet_a_member": "NOT YET A MEMBER fr",
			"register": "Register fr",
			"register_text": "Register text fr",
			"personal_info": "Personal information fr",
			"billing_info": "Billing information fr",
			"delivery_info": "Delivery information fr",
			"subscribe_newsletter": "Subscribe to our newsletter fr",
			"shopping_cart": "Shopping Cart fr",
			"delivery_and_billing": "Delivery & Billing Address fr",
			"payment": "Payment fr",
			"your_shopping_total": "Your Shopping Total fr",
			"order_summary": "Order Summary fr",
			"next": "Next fr",
			"back_to_cart": "Back to cart fr",
			"name": "Name fr",
			"family_name": "Family Name fr",
			"middle_name": "Middle Name fr",
			"age": "Age fr",
			"city": "City fr",
			"occasion": "Occasion fr",
			"preferences": "Preferences fr",
			"gender": "Gender fr",
			"address": "Address fr",
			"address_name": "Address name fr",
			"username": "Username fr",
			"street": "Street fr",
			"phone": "Phone fr",
			"building": "Building fr",
			"delivery_address": "Delivery address fr",
			"choose_predefined": "Choose Predefined address fr",
			"add_new_one": "Or add a new one fr",
			"billing_address": "Billing address fr",
			"required_field": "Required Field fr",
			"budget_is_required": "Budget is required fr",
			"preferences_of_the_gift_recipient": "Preferences of the gift recipient fr",
			"checkout": "Checkout fr",
			"same_as_password": "and should be same as password fr"
		}

		$translateProvider.translations('en',en_translations);

		$translateProvider.translations('fr',fr_translations);
		$translateProvider.preferredLanguage('en');
	})
;
