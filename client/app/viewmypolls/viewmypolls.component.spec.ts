'use strict';

describe('Component: ViewmypollsComponent', function() {
  // load the controller's module
  beforeEach(module('voting3App.viewmypolls'));

  var ViewmypollsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ViewmypollsComponent = $componentController('viewmypolls', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
