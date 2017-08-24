'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/createpoll', {
      template: '<createpoll></createpoll>'
    });
}
