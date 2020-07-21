const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser")
const config = require("../config")

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json())

const Url = require('../models/Url');

const saveLink = require("../modules/savelink")
const saveCustomLink = require("../modules/savecustomlink")

router.post("/create", async(req, res) => {
    if (req.session.user) {
        if (req.body.urlCode) {
            if (req.body.urlCode.length > 15) {
                return res.status(400).json({
                    error: "Custom ID can't be longer than 15 characters"
                })
            } else if (req.body.urlCode.length < 5) {
                return res.status(400).json({
                    error: "Custom ID can't be shorter than 5 characters"
                })
            } else {
                const customLink = await saveCustomLink(req.session.user, req.body.longUrl, req.body.urlCode)
                return res.json({
                    success: true,
                    url: customLink
                })
            }
        }
        const savedLink = await saveLink(req.session.user, req.body.longUrl)
        res.json({
            success: true,
            url: savedLink
        })
    } else {
        res.status(400).json({
            error: "You're not logged in!"
        })
    }
})

// @route     DELETE /:code
// @desc      Delete short URL

router.delete('/:code', async(req, res) => {
    if (!req.session.user) {
        return res.status(400).json({
            error: "You're not logged in!"
        })
    } else {
        const url = Url.findOne({ urlCode: req.params.code })
        if (url) {
            await url.remove()
            res.json({
                message: `Successfully deleted '${req.params.code}'`
            })
        } else {
            res.status(404).json({
                error: "No URL found with that code!"
            })
        }
    }
})

// @route     DELETE /authorized
// @desc      Check if authorized

router.get("/authorized", (req, res) => {
    if (req.session.user) {
        return res.json({
            authorized: true,
            user: req.session.user
        })
    } else {
        return res.json({
            authorized: false,
            authorize_url: `${config.baseUrl.replace("/s", "")}/discord/login`
        })
    }
})

module.exports = router;