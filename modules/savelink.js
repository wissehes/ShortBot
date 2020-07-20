const validUrl = require('valid-url');
const shortid = require('shortid');
const getWebsiteMetadata = require("../modules/getWebsiteMetadata")

const Url = require('../models/Url');

module.exports = (user, longUrl, secret = false) => {
    return new Promise(async(resolve, reject) => {
        const { baseUrl } = require('../config')
        const urlCode = shortid.generate();

        if (validUrl.isUri(longUrl)) {
            try {
                let url = await Url.findOne({ longUrl });

                if (url) {
                    resolve(url)
                    return;
                } else {
                    const shortUrl = baseUrl + '/' + urlCode;
                    const userId = user.id
                    var title = await getWebsiteMetadata(longUrl)
                    if (!title)
                        title = urlCode

                    url = new Url({
                        userId,
                        longUrl,
                        title,
                        shortUrl,
                        urlCode,
                        date: new Date(),
                        secret: secret ? true : false
                    });

                    await url.save();

                    resolve(url)
                }
            } catch (err) {
                console.error(err);
                reject('error');
            }
        } else {
            reject('Invalid long url');
        }
    })
}