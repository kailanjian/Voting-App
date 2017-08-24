'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/viewmypolls', {
      template: '<viewmypolls></viewmypolls>'
    });
}
