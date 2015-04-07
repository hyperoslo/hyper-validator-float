require('./hyper-validator-float');

module.exports = angular.module('hyper-validator-float')
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
