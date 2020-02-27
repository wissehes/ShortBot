const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  console.log(req.session)
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      if(url.secret) {
        if(!req.session.user) {
          const config = require('../config')
          res.render('openPopup', {
            client_id: config.clientId,
            redirect: encodeURIComponent(config.callback)
          })
        } else {
          if(req.session.user.id === url.userId) {
            res.redirect(301, url.longUrl)
          } else {
            res.render('noperms', {
              urlCode: url.urlCode,
              user: req.session.user
            })
          }
        }
      } else {
        return res.redirect(url.longUrl);
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