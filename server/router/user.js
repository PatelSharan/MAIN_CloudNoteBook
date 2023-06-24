const express = require('express')
const router = express.Router()
const User = require('../models/user.js')


router.get('/', (req, res) => {
    res.send('Server....')
})


router.post('/registeruser', async (req, res) => {
    const newUser = await new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    const result = await newUser.save()
    res.status(200).send(newUser)
})


module.exports = router