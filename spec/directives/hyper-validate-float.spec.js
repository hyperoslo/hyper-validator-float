describe('Number input field', function () {

  beforeEach(function() {
    browser.get('http://localhost:4000');
  });

  it('should not accept non numeric or comma values', function () {
    input = element(by.model('number'));
    input.sendKeys('a');
    expect(input.getAttribute('value')).toEqual('');
  });

  it('should accept numeric values', function () {
    input = element(by.model('number'));
    input.sendKeys('2');
    expect(input.getAttribute('value')).toEqual('2');
  });

  it('should display dot value', function () {
    input = element(by.model('number'));
    input.sendKeys('1,');
    expect(input.getAttribute('value')).toEqual('1.');
  });

  it('should not display comma in model value if there is no value after', function () {
    input = element(by.model('number'));
    output = element(by.css('#model-value'));
    input.sendKeys('1,');
    expect(output.getAttribute('value')).toEqual('1');
  });

  it('should display comma in model value', function () {
    input = element(by.model('number'));
    output = element(by.css('#model-value'));
    input.sendKeys('1,3');
    expect(output.getAttribute('value')).toEqual('1.3');
  });
});
