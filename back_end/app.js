// ---------------------------------------------------------
// Isomporphic fetch and es6-promise
// 2018-01-03 14:11
// ---------------------------------------------------------

require('es6-promise').polyfill()
require('isomorphic-fetch')

const express = require('express');
const app = express();

// ----------------------------------------
// App Variables
// ----------------------------------------
app.locals.appName = 'My App';

// ---------------------------------------------------------
// Fetch
// 2018-01-03 08:50
// ---------------------------------------------------------
const fetch = require('node-fetch');

// ---------------------------------------------------------
// xml-js 
// 2018-01-03 09:12
// ---------------------------------------------------------
var parseString = require('xml2js').parseString;

// ----------------------------------------
// ENV
// ----------------------------------------
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


// ----------------------------------------
// Body Parser
// ----------------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// ----------------------------------------
// Sessions/Cookies
// ----------------------------------------
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.SESSION_SECRET || 'secret'
  ]
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


// ----------------------------------------
// Flash Messages
// ----------------------------------------
const flash = require('express-flash-messages');
app.use(flash());


// ----------------------------------------
// Method Override
// ----------------------------------------
const methodOverride = require('method-override');
const getPostSupport = require('express-method-override-get-post-support');

app.use(methodOverride(
  getPostSupport.callback,
  getPostSupport.options // { methods: ['POST', 'GET'] }
));


// ----------------------------------------
// Referrer
// ----------------------------------------
app.use((req, res, next) => {
  req.session.backUrl = req.header('Referer') || '/';
  next();
});


// ----------------------------------------
// Public
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));


// ----------------------------------------
// Logging
// ----------------------------------------
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan);

app.use(morganToolkit());


// ----------------------------------------
// Routes
// ----------------------------------------
//app.use('/', (req, res) => {
  //req.flash('Hi!');
  //res.render('welcome/index');
//});

app.use('/authors/:author', (req, res) => {
  let author = req.params.author.split("+").join("%20")

  fetch(`https://www.goodreads.com/api/author_url/${author}?key=${process.env.KEY}`)
  .then((res) => {
    return res.text();
  })
  .then((xml) => {

    parseString(xml, function (err, result) {
      console.log(JSON.stringify(result, null, 2));
      console.log("result.GoodReadsResponse.author.$.id: ", result.GoodreadsResponse.author[0].$.id);
      
      fetch(`https://www.goodreads.com/author/show/${result.GoodreadsResponse.author[0].$.id}?format=xml&key=${process.env.KEY}`)
        .then((res) => {
          return res.text();
        })
        .then((xml) => {
          parseString(xml, function (err, result) {
            res.send(JSON.stringify(result, null, 2));
          });
        });
    });
  })
});

app.use('/titles/:title', (req, res) => {
  let title = req.params.title;

  fetch(`https://www.goodreads.com/book/title.xml?key=${process.env.KEY}&title=${title}`)
  .then((res) => {
    return res.text();
  })
  .then((xml) => {
    parseString(xml, function (err, result) {
      console.log(JSON.stringify(result, null, 2));
        res.send(JSON.stringify(result, null, 2));
    });
  })
});

// ----------------------------------------
// Template Engine
// ----------------------------------------
const expressHandlebars = require('express-handlebars');
const helpers = require('./helpers');

const hbs = expressHandlebars.create({
  helpers: helpers,
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// ----------------------------------------
// Server
// ----------------------------------------
const port = process.env.PORT ||
  process.argv[2] ||
  4000;
const host = 'localhost';

let args;
process.env.NODE_ENV === 'production' ?
  args = [port] :
  args = [port, host];

args.push(() => {
  console.log(`Listening: http://${ host }:${ port }\n`);
});

if (require.main === module) {
  app.listen.apply(app, args);
}


// ----------------------------------------
// Error Handling
// ----------------------------------------
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(500).render('errors/500', { error: err });
});


module.exports = app;






