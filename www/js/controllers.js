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
  var url = base_url; 
  url += '?cfg=' + 'json';
  url += '&gy=' + $scope.date.getFullYear();
  url += '&gm=' + ($scope.date.getMonth() + 1);
  url += '&gd=' + $scope.date.getDate();
  url += '&g2h=' + '1';

  $http.get(url).then(function(resp) {
    $scope.success = true;
    $scope.resp = resp.data;

    for(var i = 0; i < resp.data.events.length; i++) {
      if(resp.data.events[i].substring(0, "Parashat".length) === "Parashat") {
        $scope.parsha = resp.data.events[i];
      }
    }
  }, function(err) {
    $scope.success = false;
    $scope.resp = err;
  });

  var base_url = 'http://www.sefaria.org/api/texts/Bereishit.25:1-27:19';
  var url = base_url;
  url += '?context=0';
  url += '&commentary=0';
  url += '&callback=JSON_CALLBACK'
    $http.jsonp(url).then(function(resp) {
      $scope.success = true;
      var text = resp.data.text;
      var en = [];
      var chapter = 25;
      $scope.book = resp.data.book;
      for(var i = 0; i < text.length; i++){
        en[i] = {
          chapter : chapter,
          text    : []
        };
        for(var j = 0; j < text[i].length; j++) {
          en[i].text[j] = {
            verse :  j + 1,
            text  : text[i][j]
          };
        };
        chapter++;
      }
      $scope.en = en;
    }, function(err) {
    $scope.success = false;
    $scope.text = err;
  });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});


