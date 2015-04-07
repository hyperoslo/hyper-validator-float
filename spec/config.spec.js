require('../../hyper-validator-base/src/providers/hyper-validator-base');
require('../src/config');

describe('Configure: hyper-validator-float', function() {
  var HyperValidator;
  var provider;

  var validateFn = jasmine.createSpy('validateFn');

  beforeEach(function() {
    angular.mock.module('hyper-validator-base', function(HyperValidatorProvider) {
      provider = HyperValidatorProvider;
      provider.addValidator('float', validateFn);
    });

    angular.mock.inject(function(_HyperValidator_) {
      HyperValidator = _HyperValidator_;
    });
  });

  it('tests the providers internal function', function() {
    HyperValidator.validate('float', 12, 3);
    expect(validateFn).toHaveBeenCalledWith(12, 3);
  });
});
