'use strict';
const angular = require('angular');

export default angular.module('voting3App.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
