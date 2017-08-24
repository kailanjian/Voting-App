'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './viewpoll.routes';

declare let Chart:any;

export class ViewpollComponent {
  $http;
  $routeParams;
  $scope;
  $timeout;

  Auth;

  pollsList = [];
  pollId;
  currPoll = {options: []};
  chart;

  hasVoted = false;

  /*@ngInject*/
  constructor($http, $routeParams, $scope, $timeout, Auth) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.pollId = $routeParams.id;
    this.Auth = Auth;
    console.log("constructed");

  }

  updateChart() {
    var data = []; 
    var labels = []; 
    for (let i = 0; i < this.currPoll.options.length; i++) {
      data.push(this.currPoll.options[i].votes);
      labels.push(this.currPoll.options[i].name);
    }

    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  renderChart() {
      console.log("start render");
      var data = []; 
      var labels = []; 
      for (let i = 0; i < this.currPoll.options.length; i++) {
        data.push(this.currPoll.options[i].votes);
        labels.push(this.currPoll.options[i].name);
      }

      var ctx = (<HTMLCanvasElement>document.getElementById("chartCanvas")).getContext("2d");
      
      var kellyColors = [
        "#FFB300",
        "#803E75",
        "#FF6800",
        "#A6BDD7",
        "#C10020",
        "#CEA262",
        "#817066",
        "#007D34",
        "#F6768E",
        "#00538A",
        "#FF7A5C",
        "#53377A",
        "#FF8E00",
      ];

      var labeledData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: kellyColors, 
                hoverBackgroundColor: kellyColors
            }]
      };


      var chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: labeledData,
        options: {
          animation: {
            animateScale:true
          }
        }
      });
      this.chart = chartInstance;
      console.log("stop render");
  }

  alreadyVotedError() {
    alert("You already voted");
  }

  voteClick() {
    var selectedOption;

    console.log("voted");
    let selected = this.$scope.selectedOption.name;
    console.log(this.$scope.selectedOption)
    console.log("clicked");
    for (var index in this.currPoll.options) {
      if (this.currPoll.options[index].name == selected) {
        selectedOption = index;
        this.currPoll.options[index].votes = this.currPoll.options[index].votes + 1;
        console.log("voted");
      }
    }

    this.updateChart();
    console.log("patching " + this.pollId);
    
    var beforeCall = this;

    this.$http.put('/api/polls/vote/' + this.pollId, this.currPoll)
    .then(
    // success
    function(res) {
        console.log("RECEIVED");
        console.log(res);
        console.log("CURRENT");
        console.log(beforeCall.currPoll);
        beforeCall.currPoll = res.data;
    }, 
    // fail
    function(res) {
      console.log("FAIL");
      beforeCall.alreadyVotedError();
      beforeCall.$timeout(function() {
        console.log("timing out");
        beforeCall.currPoll.options[selectedOption].votes = beforeCall.currPoll.options[selectedOption].votes - 1;
        beforeCall.updateChart();    
      });
    });

  }

  $onInit() {
    // TODO: move this to update method
    this.$http.get('/api/polls').then(response => {
      this.pollsList = response.data;
      for (let i = 0; i < this.pollsList.length; i++) {
        if (this.pollsList[i]._id == this.pollId) {
          this.currPoll = this.pollsList[i];
        }
      } 
      this.renderChart();

      this.$scope.selectedOption = this.currPoll.options[0];
    });

    var user = this.Auth.getCurrentUserSync();
    this.$scope.userName = user.name;
    console.log(user);
  }
}

export default angular.module('voting3App.viewpoll', [ngRoute])
  .config(routes)
  .component('viewpoll', {
    template: require('./viewpoll.html'),
    controller: ViewpollComponent,
    controllerAs: 'viewpollCtrl'
  })
  .name;
