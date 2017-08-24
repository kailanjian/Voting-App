'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');


const ngRoute = require('angular-route');

const uiBootstrap = require('angular-ui-bootstrap');
import 'angular-validation-match';



import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';

import viewpoll from './viewpoll/viewpoll.component';
import createpoll from './createpoll/createpoll.component';
import viewmypolls from './viewmypolls/viewmypolls.component';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';

import constants from './app.constants';
import util from '../components/util/util.module';



import './app.scss';

angular.module('voting3App', [
  ngCookies,
  ngResource,
  ngSanitize,


  ngRoute,
  uiBootstrap,

  _Auth,
  account,
  admin,
  'validation.match',
    navbar,
  footer,
  main,
  constants,
  viewpoll,
  createpoll,
  viewmypolls,

  util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['voting3App'], {
      strictDi: true
    });
  });
