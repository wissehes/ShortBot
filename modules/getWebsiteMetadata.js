const axios = require("axios").default
const cheerio = require('cheerio');

const getMetaData = (url) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel('time out');
    }, 2000)
    return new Promise((resolve, rej) => {
        axios.get(url, {
                cancelToken: source.token,
                timeout: 2000,
                headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:78.0) Gecko/20100101 Firefox/78.0' }
            })
            .then(res => {
                clearTimeout(timeout)
                const $ = cheerio.load(res.data);
                const title = $('head title').text()
                if (title)
                    resolve(title)
                else
                    resolve()
            })
            .catch(() => resolve())
    })
}

module.exports = getMetaData