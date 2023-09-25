const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req,res, next) => {
    console.log('auth middleware')

    try {
        const token = req.headers['authorization'].split(' ')[1]
        const authUser = jwt.verify(token, process.env.JWT_SECRET)

        req.authUser = authUser

        console.log(authUser)

        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            msg: "authorization failed",
            error: error.message
    })
    }
}