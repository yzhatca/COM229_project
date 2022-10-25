let mongoose = require('mongoose');

// create a model class
let contactsModel = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String,
},
{
    collection: "contacts"
});

module.exports = mongoose.model('contacts', contactsModel);