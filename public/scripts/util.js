ETApp.factory('randomizer', function() {
  var service = {};

  service.randomInt = function(min, max, not) {
    if (not !== undefined && max - min === 1) {
      throw "Can't pick a number from " + min + ", " + max + " excluding " + not;
    }
    var rand = ~~(Math.random()*(max-min+1)) + min;
    return (rand === not ? service.randomInt(min, max, not) : rand);
  };

  service.randomElems = function(array, quantity, not) {
    if (not && quantity + not.length > array.length) throw "not enough elements.";
    not = not || [];
    var copy = array.slice();
    var result = [];
    while (quantity) {
      var idx = Math.floor(Math.random()*copy.length);
      if (not.indexOf(copy[idx]) === -1) {
        result.push(copy.splice(idx, 1)[0]);
        quantity--;
      }
    }
    return result;
  };

  service.randomElem = function(array, not) {
    if (not !== undefined) not = [not];
    return service.randomElems(array, 1, not)[0];
  };

  // Takes an array, moves the first index to a random location
  // and returns the location of the new location.
  service.shuffleFirst = function(answers) {
    var idx = service.randomInt(0, answers.length - 1);
    var temp = answers[0];
    answers[0] = answers[idx];
    answers[idx] = temp;
    return idx;
  };

  return service;
});