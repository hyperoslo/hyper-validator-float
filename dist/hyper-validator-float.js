(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./src/hyper-validator-float');
require('./src/config');
require('./src/directives/hyper-validate-float');

},{"./src/config":2,"./src/directives/hyper-validate-float":3,"./src/hyper-validator-float":4}],2:[function(require,module,exports){
require('./hyper-validator-float');

module.exports = angular.module('hyper-validator-float', ['hyper-validator-base'])
  .config(function(HyperValidatorProvider) {
    var _shouldMatch = function(string, regexp) {
      return string.match(regexp) != null;
    }

    var _validateFloat = function(currentValue, char) {
      currentValue || (currentValue = '');
      if (currentValue.match(/,|\./) && _shouldMatch(char, /[,.]/)) {
        false;
      } else {
        _shouldMatch(char, /[,.]|\d/);
      }
    }
    HyperValidatorProvider.addValidator('float', function(currentValue, char) {
      return _validateFloat(currentValue, char);
    });
  });

},{"./hyper-validator-float":4}],3:[function(require,module,exports){
require('../hyper-validator-float');

module.exports = angular.module('hyper-validator-float', [])
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

},{"../hyper-validator-float":4}],4:[function(require,module,exports){
module.exports = angular.module('hyper-validator-float', []);

},{}]},{},[1]);
