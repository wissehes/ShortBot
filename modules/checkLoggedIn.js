module.exports = (req, res, next) => {
    if (req.session.user && !req.session.user.username.toLowerCase().includes("unauthorized")) {
        next()
    } else {
        return res.status(401).json({
            error: "Unauthorized"
        })
    }
}