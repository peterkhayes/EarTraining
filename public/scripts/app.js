// var player = new Instrumental({
//   path: 'audio'
// });

// player.loadInstrument('piano', [39, 44, 49, 54, 59, 64, 69, 74]);

var ETApp = angular.module('earTraining', [])
.config(function($routeProvider, $locationProvider) {
  $routeProvider.when("/", {controller: 'gameController', templateUrl: 'templates/game.html'});
})
.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
})
.factory('player', function() {
  var player = new Instrumental({
    path: 'audio'
  });
  player.loadInstrument('piano', [39, 44, 49, 54, 59, 64, 69, 74]);
  player.delayNote = function(note) {
    setTimeout(function() {player.play("piano", note.pitch, note.len, 1);}, note.delay);
  };
  return player;
})
.controller('gameController', function(player, questionMaker, $scope) {

  var ask = function() {
    var q = questionMaker.makeQuestion(1);

    $scope.question = q.question;
    for (var i = 0; i < q.notes.length; i++) {
      note = q.notes[i];
      player.delayNote(note);
    }
  };

  ask();

  $scope.guess = function(num) {

  };
});