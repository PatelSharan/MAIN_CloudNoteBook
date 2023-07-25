const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY



const fetchuser = (req, res, next) => {
    try {
        const token = req.header('jwt-token')
        if (!token) {
            res.status(401).send('Authenticate using valid token')
        }
        const decoded = jwt.verify(token, SECRET_KEY)
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log(error.message)
        res.send('Authentication user Failed')
    }
}



module.exports = fetchuser