'use strict'

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.set( 'view engine', 'jade' );

//middleware
app.use( morgan('dev') );
app.use( bodyParser.urlencoded( { extended: true } ) );   // access form data
app.use( bodyParser.json() )  // access json data
app.use( express.static('public') ) // path to static files


//routes
app.use('/', require('./routes/contacts'));
app.use('/update', require('./routes/contacts'));
app.use('/delete', require('./routes/contacts'));

app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});



app.listen(port)
