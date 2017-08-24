'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/viewpoll', {
      template: '<viewpoll></viewpoll>'
    })
    .when('/viewpoll/:id', {
      template: '<viewpoll></viewpoll>'
    });
}
