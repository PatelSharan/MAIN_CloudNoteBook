const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    res.send('Server....')
})


router.post('/registeruser', async (req, res) => {

    try {

        const { name, email, password } = req.body

        //If name, email, and password not enterd
        if (!name || !email || !password) {
            res.status(400).send('please fill details')
        }


        //If user is already Exist
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400).send('User Exist With This Email')
        }

        // hash password
        const saltRound = 10;
        const hasedPassword = await bcrypt.hash(req.body.password, saltRound)


        //newUser 
        const newUser = await new User({ name, email, password: hasedPassword })

        //Save new user Into DB
        const result = await newUser.save()
        res.status(200).send(newUser)

    } catch (error) {
        res.send('can\'t register user')
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
        if (!findUser) {
            res.status(400).send('User Not Exist')
        }

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