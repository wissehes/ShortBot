const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

const config = require('../config')

// @route     GET /:code
// @desc      Redirect to long/original URL

router.get('/', async(req, res) => {
    const user = req.session.user ? req.session.user : null
    const userid = req.session.user ? req.session.user.id : null

    res.render('index', {
        user: user,
        client_id: config.clientId,
        redirect: encodeURIComponent(config.callback)
    })
});
router.get('/mylinks', async(req, res) => {
    if (!req.session.user) {
        return res.redirect("/");
    }
    const user = req.session.user
    const userid = req.session.user.id
    const urls = await Url.find({ userId: userid }).lean()

    res.render('links', {
        user: user,
        client_id: config.clientId,
        redirect: encodeURIComponent(config.callback),
        links: urls
    })
})


module.exports = router;