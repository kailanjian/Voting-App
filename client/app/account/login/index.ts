'use strict';
const angular = require('angular');
import LoginController from './login.controller';

export default angular.module('voting3App.login', [])
  .controller('LoginController', LoginController)
  .name;
