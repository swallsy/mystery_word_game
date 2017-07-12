
const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const fs = require('file-system');
const app = express();
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
const routes = require('./routes.js');
const utils = require('./utils.js');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(routes);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

var ssn;

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
