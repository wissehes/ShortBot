const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/', async (req, res) => {
    //res.redirect(301, 'https://discordapp.com/api/oauth2/authorize?client_id=682159867334623234&permissions=52224&scope=bot')
    //res.sendFile(__dirname + '/views/index.html')
    res.render('index', {
        user: req.session.user ? req.session.user : null
    })
});


module.exports = router;