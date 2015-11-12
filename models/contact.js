'use strict'

var fs = require('fs');
var datafile = 'db/contacts.json'

var Contact = {};

Contact.default = [{
  name: "",
  email: "",
  phone: "",
  address: ""
}]

Contact.find = function(cb) {
  fs.readFile(datafile, function(err,contacts) {
    if (err) return cb(err);

    contacts = JSON.parse(contacts)
    if (!contacts.length) {
      contacts = Contact.default
    };
    cb(null, contacts );
  });
};

Contact.create = function(contact, cb) {
  Contact.find(function(err,contacts){
    contacts.push(contact);
    fs.writeFile('db/contacts.json', JSON.stringify(contacts), cb)
  })
};

Contact.update = function(data, cb) {
  Contact.find( function(err,contacts) {
    let contact = data.contact;
    let id = data.id-1;
    contacts.splice(id,1,contact)
    console.log(contacts);
    fs.writeFile('db/contacts.json', JSON.stringify(contacts), cb)
  });
};

Contact.delete = function(data, cb) {
  Contact.find( function(err,contacts) {
    console.log("req.body",data)
    let id = data.id;
    contacts.splice(id,1)
    console.log(contacts);
    fs.writeFile('db/contacts.json', JSON.stringify(contacts), cb)
  });
};

module.exports = Contact;