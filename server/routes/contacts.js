let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

let passport = require('passport');
// connect to our contacts Model

let contactsController = require('../controllers/contacts');
// helper function for guard purposes

function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the contacts List page - READ Operation */
router.get('/', requireAuth, contactsController.displaycontactsList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', contactsController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', contactsController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', contactsController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', contactsController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', contactsController.performDelete);

module.exports = router;