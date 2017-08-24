'use strict';

describe('Component: CreatepollComponent', function() {
  // load the controller's module
  beforeEach(module('voting3App.createpoll'));

  var CreatepollComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CreatepollComponent = $componentController('createpoll', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
