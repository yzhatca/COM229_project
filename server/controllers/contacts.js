let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let contacts = require('../models/contacts');

module.exports.displaycontactsList = (req, res, next) => {
    contacts.find((err, contactsList) => {
        if (err) {
            return console.error(err);
        } else {
            // console.log(contactsList);
            res.render('pages/contacts/list', {
                title: 'contacts',
                contactsList: contactsList,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('pages/contacts/add', {
        title: 'Add contacts',
        displayName: req.user ? req.user.displayName : ''
    })
}

module.exports.processAddPage = (req, res, next) => {
    let newcontacts = contacts({
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "message": req.body.message,
    });

    contacts.create(newcontacts, (err, contacts) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the contacts list
            res.redirect('/contacts-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    contacts.findById(id, (err, contactsToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('pages/contacts/edit', {
                title: 'Edit contacts',
                contacts: contactsToEdit,
                displayName: req.user ? req.user.displayName : ''
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedcontacts = contacts({
        "_id": id,
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "message": req.body.message,
    });

    console.log(updatedcontacts)

    contacts.updateOne({
        _id: id
    }, updatedcontacts, (err) => {
        // console.log(updatedcontacts)
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the contacts list
            res.redirect('/contacts-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    contacts.remove({
        _id: id
    }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the contacts list
            res.redirect('/contacts-list');
        }
    });
}