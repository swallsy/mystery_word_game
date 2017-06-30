const fs = require('file-system');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
var exports = module.exports = {};
// var ssn = {};

exports.diff = "";
exports.mysteryWord = "";
exports.blanks = [];
exports.letter_bank = [];
exports.guess_counter = [];
exports.easyWords = [];
exports.mediumWords = [];
exports.hardWords = [];
exports.msg = '';

exports.sortWords = function (words) {
  for (i = 0; i < words.length; i++) {
    if (words[i].length < 6) {
        exports.easyWords.push(words[i]);
    } else if (words[i].length > 5 && words[i].length < 8) {
        exports.mediumWords.push(words[i]);
    } else if (words[i].length > 8 && words[i].length < 13){
        exports.hardWords.push(words[i]);
      }
  }
};

exports.init = function() {
    exports.msg = ' ';
    exports.diff = "";
    exports.mysteryWord = "";
    exports.blanks = [];
    exports.letter_bank = [];
    exports.guess_counter = [];
    exports.easyWords = [];
    exports.mediumWords = [];
    exports.hardWords = [];
    // ssn = session;
    exports.sortWords(words);
};

exports.init();

exports.generateWord = function(difficulty) {
    if (difficulty === "easy") {
        var word = exports.easyWords[Math.floor(Math.random()*exports.easyWords.length)];
    } else if (difficulty === "medium") {
        var word = exports.mediumWords[Math.floor(Math.random()*exports.mediumWords.length)];
    } else {
        var word = exports.hardWords[Math.floor(Math.random()*exports.hardWords.length)];
    }
    console.log(word);
    var mysteryWord = word.split("");
    return mysteryWord;
};

// function when called, checks for a match between the guess and the mystery word
exports.match = function (letter) {
  for (i = 0; i < exports.mysteryWord.length; i++) {
    if (letter == exports.mysteryWord[i]) {
      exports.blanks[i] = letter;
    }
  }
  exports.letter_bank.push(letter);
  if (exports.blanks.indexOf(letter) == -1) {
      exports.guess_counter.push(" ");
  }
};

// function to output the html, function should accept an array
exports.generateHtml = function (arr) {
  var html = arr.map(function(char) {
    return `
      <div class="blank">${char}</div>
    `
  });
    return html.join("");
};

exports.generateCount = function (arr) {
  var count = arr.map(function(num){
    return `
      <div class="guessed"> </div>
    `
  })
  return count.join("");
};

exports.generateBank = function (arr) {
  var bank = arr.map(function(char) {
    return `
    <div class="guessedLetter">${char}</div>
    `
  })
  return bank.join("");
}

exports.alreadyGuessed = function(guess) {
  if (exports.letter_bank.indexOf(guess) === -1) {
    return false;
  } else {
    return true;
  }
};
