'use strict';

describe('Service: Discussion', function () {

  // load the service's module
  beforeEach(module('classbookApp'));

  // instantiate service
  var Discussion;
  beforeEach(inject(function (_Discussion_) {
    Discussion = _Discussion_;
  }));

  it('should do something', function () {
    expect(!!Discussion).toBe(true);
  });

});
