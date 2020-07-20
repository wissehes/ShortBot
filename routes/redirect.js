const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

const redirect = async(res, url) => {
    var clickCount = url.clickCount;
    clickCount++;
    await url.updateOne({ clickCount });
    res.redirect(url.longUrl)
}

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async(req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
        if (url) {
            if (url.secret) {
                if (!req.session.user) {
                    const config = require('../config')
                    res.render('openPopup', {
                        client_id: config.clientId,
                        redirect: encodeURIComponent(config.callback)
                    })
                } else {
                    if (req.session.user.id === url.userId) {
                        redirect(res, url)
                    } else {
                        res.render('noperms', {
                            urlCode: url.urlCode,
                            user: req.session.user
                        })
                    }
                }
            } else {
                return redirect(res, url);
            }
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

module.exports = router;