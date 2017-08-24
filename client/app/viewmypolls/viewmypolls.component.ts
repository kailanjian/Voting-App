'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './viewmypolls.routes';

export class ViewmypollsComponent {

  $http;
  pollsList;
  Auth;

  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
  }

  $onInit() {
    this.$http.get('/api/polls').then(response => {
      var userId = this.Auth.getCurrentUserSync()._id;
      var allPolls = response.data;
      this.pollsList = allPolls.filter(n => n.creator == userId);
    });
  }

  deletePoll(id) {
    this.$http.delete('/api/polls/' + id);
    this.pollsList = this.pollsList.filter(n => n._id != id);
  }
}

export default angular.module('voting3App.viewmypolls', [ngRoute])
  .config(routes)
  .component('viewmypolls', {
    template: require('./viewmypolls.html'),
    controller: ViewmypollsComponent,
    controllerAs: 'viewmypollsCtrl'
  })
  .name;
