'use strict';

describe('Component: ViewpollComponent', function() {
  // load the controller's module
  beforeEach(module('voting3App.viewpoll'));

  var ViewpollComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ViewpollComponent = $componentController('viewpoll', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
