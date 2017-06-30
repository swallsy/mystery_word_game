const express = require('express');
const router = express.Router();
const mustacheExpress = require('mustache-express');
const utils = require('./utils.js');

router.get('/start', function(req, res){
  // ssn = req.session;

  // ssn.diff = "";
  // ssn.mysteryWord = "";
  // ssn.blanks = [];
  // ssn.letter_bank = [];
  // ssn.guess_counter = [];
  // ssn.easyWords = [];
  // ssn.mediumWords = [];
  // ssn.hardWords = [];
  // ssn.msg = '';
  //
  // req.session.destroy(function(err) {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     res.redirect('/');
  //   }
  // });
  utils.init();
  res.render('')
})

router.get('/game/:difficulty', function (req, res) {
  ssn = req.session;
  if (utils.diff !== req.params.difficulty) {
    utils.init();
  }
  if (!utils.mysteryWord) {
    utils.diff = req.params.difficulty;
    utils.mysteryWord = utils.generateWord(utils.diff);
    for (i = 0; i < utils.mysteryWord.length; i++) {
      utils.blanks.push(" ");
    };
  }

  res.render('game', {
    msg: utils.msg,
    difficulty: utils.diff,
    blankWord: utils.generateHtml(utils.blanks),
    letter_bank: utils.generateBank(utils.letter_bank),
    guessCounter: utils.generateCount(utils.guess_counter)
  })
});

router.post('/game', function(req, res) {
  ssn = req.session;
  var letterGuess = req.body.letterGuess;
  if (utils.alreadyGuessed(letterGuess)) {
    utils.msg = 'You already guessed that one!';
  } else {
    utils.msg = '';
    utils.match(letterGuess);
  }
  if (utils.guess_counter.length == 8) {
    res.redirect('/lose');
  } else if (utils.blanks.indexOf(" ") == -1) {
      res.redirect('/win')
  } else {
      res.redirect('/game/' + utils.diff);
    }
})

router.get('/lose', function (req, res) {
  ssn = req.session;
  res.render('lose', {mysteryWord: utils.mysteryWord.join('')})
});

router.get('/win', function (req, res) {
  ssn = req.session;
  res.render('win', {mysteryWord: utils.mysteryWord.join('')})
});

module.exports = router;
