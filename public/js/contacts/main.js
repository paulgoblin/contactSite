'use strict';

$(document).ready(init);

function init() {

  $('button#saveContact').click(submitContact);
  $('button#add').click(newForm);
  $('#contactList').on('click', 'a.edit', populateModal);
  $('#contactList').on('click', 'td.delete', deletePrompt);
}

function deletePrompt (e) {
  swal({
    title: "Delete this contact?",  
    showCancelButton: true,
    closeOnConfirm: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "#ec6c62",
    confirmButtonClass: 'confirm-class'
  },function(isConfirm){
    if(isConfirm){
      deleteContact(e)
    }
  });
}

function deleteContact (e) {
  console.log("deleteing contact")
  var $tr = $(e.target).closest('tr');
  var id = $tr.index();

  $.post('/delete', {id: id})
  .done(function(data){
    console.log(data)
    $tr.remove(); 
  })
  .fail(function(err){
    console.error(err);
  });
  return;
}

function submitContact(){
  var contact = {};
  contact.name = $('input#name').val();
  contact.email = $('input#email').val();
  contact.phone = $('input#phone').val();
  contact.address = $('textarea#address').val();

  var id = $('.btn#saveContact').data('id');

  if (id == 0) {
    addContact(contact);
  } else {
    updateContact(contact,id);
  }
}

function updateContact(contact,id) {

  //replace in DOM
  var $tr = contactRow(contact);
  var $oldTr = $('tbody tr:nth-child(' + id + ')');
  $oldTr.after($tr);
  $oldTr.remove();

  //update DB
  $.post('/update', {id: id, contact:contact})
  .done(function(data){
    console.log(data)
  })
  .fail(function(err){
    console.error(err);
  });
  return;

}

function addContact(contact) {

  //draw new contact
  var $tr = contactRow(contact);
  $('tbody').append($tr);

  //post to contacts
  $.post('/', contact)
  .done(function(data){
    console.log(data)
  })
  .fail(function(err){
    console.error(err);
  });
  return;

}



function contactRow(contact) {

  console.log("rowmaker contact: ", contact)

  let editBtnAttr = {
    "class":"edit text-center",
    "data-toggle":"modal",
    "data-target":"#formModal"
  }
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('name').text(contact.name)
  var $email = $('<td>').addClass('email').text(contact.email)
  var $phone = $('<td>').addClass('phone').text(contact.phone)
  var $address = $('<td>').addClass('address').text(contact.address)

  var $editTd = $('<td>').attr(editBtnAttr);
  var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
  $editTd.append($editIcon);
  
  var $deleteTd = $('<td>').addClass('delete text-center');
  var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg');
  $deleteTd.append($deleteIcon);

  $tr.append($name, $email, $phone, $address, $editTd, $deleteTd);
  return $tr;
}
 
function newForm() {
  $('.modal-body input').val('');
  $('textarea').text('');
  $('.btn#saveContact').data('id',0);
}


function populateModal (e) {
  newForm();
  var $tr = $(e.target).closest('tr');
  var name = $tr.find('td#name').text();
  var email = $tr.find('td#email').text();
  var phone = $tr.find('td#phone').text();
  var address = $tr.find('td#address').text();

  var rowIndex = $tr.index() + 1;
  console.log(rowIndex)
  $('.btn#saveContact').data('id',rowIndex)

  $('input#name').val(name)
  $('input#email').val(email)
  $('input#phone').val(phone)
  $('textarea#address').text(address)

}
