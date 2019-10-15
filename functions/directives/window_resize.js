(function (){
	'use strict';
	ohmybox_app.directive('resize', function ($window) {
			return function (scope, element) {
					var w = angular.element($window);
					var slider_buttons_element = document.getElementsByClassName("sliderButtons");
					var slider_buttons= angular.element(slider_buttons_element);
					var top_main_nav_element = document.getElementsByClassName("topMainNav");
					var top_main_nav = angular.element(top_main_nav_element);
					scope.getWindowDimensions = function () {
							return {
									'h': w.height(),
									'w': w.width(),
									's_h': slider_buttons.height(),
									't_h': top_main_nav.height()
							};
					};
					scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
							scope.windowHeight = newValue.h;
							scope.windowWidth = newValue.w;
							scope.slider_buttons_height = newValue.s_h;
							scope.top_main_nav_height = newValue.t_h;
							scope.remains_height = scope.windowHeight - scope.slider_buttons_height - scope.top_main_nav_height;

							scope.style = function () {
									return {
											'height': (newValue.h - 100) + 'px',
											'width': (newValue.w - 100) + 'px'
									};
							};

					}, true);

					w.bind('resize', function () {
							scope.$apply();
					});
			}
	})
})();
