const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    userId: String,
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: { type: String, default: Date.now },
    secret: { type: Boolean, default: false }
});

module.exports = mongoose.model('Url', urlSchema);