angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $http) {
  $scope.date = new Date();
  var base_url = 'http://www.hebcal.com/converter/';
  
  console.log(JSON.stringify($scope.date.getYear()));
  
  var url = base_url; 
  url += '?cfg=' + 'json';
  url += '&gy=' + $scope.date.getFullYear();
  url += '&gm=' + ($scope.date.getMonth() + 1);
  url += '&gd=' + $scope.date.getDate();
  url += '&g2h=' + '1';

  $http.get(url).then(function(resp) {
    $scope.success = true;
    $scope.resp = resp.data;
  }, function(err) {
    $scope.success = false;
    $scope.resp = err;
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
