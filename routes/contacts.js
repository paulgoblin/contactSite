'use strict'

var express = require('express');
var router = express.Router();
var Contact = require('../models/contact.js');
// console.log('Fetched these contacts: ', Contact)

router.get('/', function(req, res) {
  Contact.find( function(err, contacts) {
    if(err) return res.status(400).send(err);
    res.render( 'contacts', {title: "Contact List", contacts: contacts} );
  })
});

router.post('/', function(req, res) {
  console.log("req.body: ", req.body)
  Contact.create(req.body, function(err,contacts) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send( "contact saved" );
    }
  })
});

router.post('/update',function(req,res){
  Contact.update(req.body,function(err,contacts) {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.send( "contact saved" );
    }
  });
});


router.post('/delete', function(req, res) {
  Contact.delete(req.body, function(err,data) {
    if (err) {
      console.error('Error getting contacts: ', err);
    } else {
      res.send( "contact deleted" );
    }
  })
});



module.exports = router;