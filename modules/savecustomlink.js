const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../models/Url');

module.exports = (user, longUrl, urlCode) => {
    return new Promise(async (resolve, reject) => {
        const { baseUrl } = require('../config')
        
        if (validUrl.isUri(longUrl)) {
            try {
                let url = await Url.findOne({ shortUrl: urlCode });

                if (url) {
                    reject('Url already exists')
                    return;
                } else {
                    const shortUrl = baseUrl + '/' + urlCode;
                    const userId = user.id;

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