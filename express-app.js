// module declarations //

// when you make a guess count up
// when you finish the game restart
// validator stuff for can only be one letter_bank
// validator has to be a letter_bank, warning saying you can't use this letter again
// validator can't repeat the letter

const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const fs = require('file-system');
const app = express();
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

var mysteryWord = generateWord(words);
var blanks = [];
var letter_bank = [];
var guess_counter = [];
var easyWords = [];
var mediumWords = [];
var hardWords = [];
for(i = 0; i < mysteryWord.length; i++) {
  blanks.push(" ");
};


//function to sort all words into easy. med, hard
function sortWords (words) {
  for (i = 0; i < words.length; i++) {
    if (words[i] < 6) {
      easyWords.push(words[i]);
    } else if (words[i] > 5 && words[i] < 8) {
      mediumWords.push(words[i]);
    } else
      hardWords.push(words[i]);
  }
}

function generateWord (words) {
    var word = words[Math.floor(Math.random()*words.length)];
    console.log(word);
    var mysteryWord = word.split("");
    return mysteryWord;
};

// function when called, checks for a match between the guess and the mystery word
function match (letter) {
  for (i = 0; i < mysteryWord.length; i++) {
    if (letter == mysteryWord[i]) {
      blanks[i] = letter;
    }
  }
  letter_bank.push(letter);
  guess_counter.push(" ");
  console.log(guess_counter);
};

// function to output the html, function should accept an array

function generateHtml (arr) {
  var html = arr.map(function(char) {
    return `
      <div class="blank">${char}</div>
    `
  });
    return html.join("");
}

function generateCount (arr) {
  var count = arr.map(function(num){
    return `
      <div class="guessed"> </div>
    `
  })
  return count.join("");
}
// Render the index mustache page, run function to convert the array into a string

app.get('/start', function(req, res){
  res.render('')
})



app.get('/game', function (req, res) {
  res.render('game', {
    blankWord: generateHtml(blanks),
    letter_bank: letter_bank,
    guessCounter: generateCount(guess_counter)
  })
});


app.post('/game', function(req, res) {
  var letterGuess = req.body.letterGuess;
  match(letterGuess);
  res.redirect('/game');
})

    // create blanks equal to the length of the word

app.listen(3000, function() {
  console.log('Started express application!')
});
