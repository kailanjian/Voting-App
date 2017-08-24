'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');

//that is some terrible syntax
// its beautiful beyond explanation
import routes from './createpoll.routes';

export class CreatepollComponent {
  message;
  options = [{value: "", placeholder: "[Option 1]"}, {value: "", placeholder: "[Option 2]"}];
  name;
  $scope;
  $http;
  $location;
  Auth;

  addOption() {
    console.log("added option");
    this.options.push({value: "", placeholder: ""});
    console.log(this.options);
  }

  errorEmptyField() {
    alert("Cannot create: One of the fields is empty.");
  }
  
  tryCreate() {
    // TODO: check auth (actually maybe before loading page)
    console.log("creating poll...");

    if (!this.Auth.isLoggedInSync())
      return;

    var user = this.Auth.getCurrentUserSync();
    
    if (!this.name) {
      this.errorEmptyField();
      return;
    }

    for (var i = 0; i < this.options.length; i++) {
      if (!this.options[i].value) {
        this.errorEmptyField();
        return;
      }
    }

    var poll = 
      {
        name: this.name,
        options: this.options.map(function(item) {
          return {name: item.value, votes:0};
        }),
        creator: user._id,
        creatorName: user.name
      };
    console.log("posting " + JSON.stringify(poll));
    console.log()
    var o = this.Auth.getCurrentUserSync();
    console.log(JSON.stringify(this.Auth.getCurrentUserSync()));
    this.$http.post('/api/polls', poll).then(response => {
      console.log("posted" + JSON.stringify(response));
      this.$location.path('/viewpoll/' + response.data._id);
    });

  }
  
  /*@ngInject*/
  constructor($scope, $http, $location, Auth) {
    'ngInject';
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.$location = $location;
    this.Auth = Auth;
  }
}

export default angular.module('voting3App.createpoll', [ngRoute])
  .config(routes)
  .component('createpoll', {
    template: require('./createpoll.html'),
    controller: CreatepollComponent,
    controllerAs: 'createpollCtrl'
  })
  .name;
