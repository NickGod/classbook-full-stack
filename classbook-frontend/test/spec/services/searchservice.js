'use strict';

describe('Service: SearchService', function () {

  // load the service's module
  beforeEach(module('classbookApp'));

  // instantiate service
  var SearchService;
  beforeEach(inject(function (_SearchService_) {
    SearchService = _SearchService_;
  }));

  it('should do something', function () {
    expect(!!SearchService).toBe(true);
  });

});
