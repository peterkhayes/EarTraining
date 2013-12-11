ETApp.factory('questionMaker', function(musicTools, randomizer) {
  var questionMaker = {};

  var instruments = ['piano'];
  var questionTypes = ['interval', 'chord', 'degree'];

  questionMaker.makeQuestion = function(difficulty) {

    difficulty = difficulty || 1;
    var questionType = randomizer.randomElem(questionTypes),
        root = randomizer.randomInt(40,60),
        q = {notes: []};

    if (questionType === 'interval') {
      q.question = "What interval is this?";

      var interval = musicTools.makeInterval(root, randomizer.randomInt(0, 16));
      if (Math.random() < 0.5) {
        interval = [interval[1], interval[0]];
      }
      q.answer = musicTools.intervalName(interval);

      for (var i = 0; i < 2; i++) {
        q.notes.push({
          pitch: interval[i],
          len: 1000,
          delay: 1000*(1+i)
        });
      }

    } else if (questionType === 'chord') {
      q.question = "What kind of chord is this?";

      q.answer = randomizer.randomElem(musicTools.basicChordTypes);
      var chord = musicTools.makeChord(root, q.answer, randomizer.randomInt(0, 2));

      for (var i = 0; i < chord.length; i++) {
        q.notes.push({
          pitch: chord[i],
          len: 1000,
          delay: 1000
        });
      }

    } else if (questionType === 'degree') {
      var mode = randomizer.randomElem(['major', 'minor']);
      var degree = randomizer.randomElem((mode === 'minor' ? [3, 4, 5, 6, 7] : [2, 3, 4, 5, 6]));
      console.log(degree);
      q.question = "What's the " + musicTools.convertToRomanNumeral(degree, mode) + " chord in " + musicTools.noteName(root) + " " + mode + "?";
      var answer = musicTools.identifyChord(musicTools.makeScaleChord(root, mode, degree));
      q.answer = musicTools.noteName(answer.root) + " " + answer.type;
      q.notes = [];
    } else if (questionType === 'progression') {

    } else {
      throw type + " is not a valid question type";
    }

    return q;
  };

  return questionMaker;
});



