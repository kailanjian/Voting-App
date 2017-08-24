'use strict';
const angular = require('angular');
import SignupController from './signup.controller';

export default angular.module('voting3App.signup', [])
    .controller('SignupController', SignupController)
    .name;
