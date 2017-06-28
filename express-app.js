// module declarations //

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
// add in express validator
app.use(express.static('public'));

app.get('/', function (req, res) {
  var mysteryWord = generateWord(words);
  var blanks = "";
  for(i = 0; i < mysteryWord.length; i++) {
    var blank = `
      <div class="blank"> </div>
    `;
    blanks += blank;
  }
  res.render('index', {blankWord: blanks})
})

app.post('/', function(req, res) {
  
})

// generate a random mystery word
function generateWord (words) {
    var word = words[Math.floor(Math.random()*words.length)];
    console.log(word);
    var blanks = [];
    var mysteryWord = word.split("");
    return mysteryWord;
};

    // create blanks equal to the length of the word

app.listen(3000, function() {
  console.log('Started express application!')
});
