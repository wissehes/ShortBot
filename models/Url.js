const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    userId: String,
    title: String,
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    clickCount: {
        type: Number,
        default: 0
    },
    date: { type: Date, default: Date.now() },
    secret: { type: Boolean, default: false }
});

module.exports = mongoose.model('Url', urlSchema);