'use strict';

describe('Service: SwapRequest', function () {

  // load the service's module
  beforeEach(module('classbookApp'));

  // instantiate service
  var SwapRequest;
  beforeEach(inject(function (_SwapRequest_) {
    SwapRequest = _SwapRequest_;
  }));

  it('should do something', function () {
    expect(!!SwapRequest).toBe(true);
  });

});
