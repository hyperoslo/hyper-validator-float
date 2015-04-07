require('../hyper-validator-float');

module.exports = angular.module('hyper-validator-float')
  .directive('hyperValidateFloat', function(HyperValidator) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keypress', function(event) {
          var value = ngModel.$viewValue
          var char = String.fromCharCode(event.keyCode)

          if (!HyperValidator.validate('float', value, char)) {
            event.preventDefault();
          }
        });
        ngModel.$parsers.unshift(function(viewValue) {
          ngModel.$setValidity('number', true);
          parseFloat(("" + viewValue).replace(',', '.'));
        });
      }
    }
  });
