(function (){
	'use strict';
	costo_app.directive('isAge', function() {
		return {
			require: 'ngModel',
			link: function(scope, element, attr, mCtrl) {
				function myValidation(value) {
					if (parseInt(value) < 0 || parseInt(value) > 124) {
						mCtrl.$setValidity('charE', false);
					} else {
						mCtrl.$setValidity('charE', true);
					}
					return value;
				}
				mCtrl.$parsers.push(myValidation);
			}
		};
	});
})();
