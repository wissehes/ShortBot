const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../models/Url');

module.exports = (user, longUrl) => {
    return new Promise(async (resolve, reject) => {
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

                    url = new Url({
                        userId,
                        longUrl,
                        shortUrl,
                        urlCode,
                        date: new Date()
                    });

                    await url.save();

                    resolve(url)
                }
            } catch (err) {
                console.error(err);
                reject('Rrror');
            }
        } else {
            reject('Invalid long url');
        }
    })
}