const jwt = require("jsonwebtoken");
const config = require("../config")
module.exports = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({
            error: "No token provided."
        }) // if there isn't any token

    jwt.verify(token, config.sessionSecret, (err, user) => {
        if (err || (user.message && user.message.toLowerCase().inludes("unauthorized"))) {
            return res.status(403).json({
                error: "Invalid token."
            })
        }

        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
}