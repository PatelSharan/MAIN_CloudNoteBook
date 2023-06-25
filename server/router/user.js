const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.send('Server....')
})


router.post('/registeruser', async (req, res) => {
    try {

        // hash password
        const saltRound = 10;
        const hasedPassword = await bcrypt.hash(req.body.password, saltRound)

        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hasedPassword
        })
        const result = await newUser.save()
        res.status(200).send(newUser)

    } catch (error) {
        res.status(500).send('can\'t register user', error)
    }
})


router.post('/loginuser', async (req, res) => {
    try {
        const { email, password } = req.body

        //If email and password not enterd
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill details" })
        }

        //find user with email
        const findUser = await User.findOne({ email })

        //password compare 
        const matchPassword = bcrypt.compare(password, findUser.password)
        if (matchPassword) {
            res.status(200).send(findUser)
        } else {
            res.status(401).send('login failed')
        }

    } catch (error) {
        res.status(400).send('can\'t login user')
    }
})



module.exports = router