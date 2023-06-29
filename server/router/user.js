const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY
const fetchuser = require('../middelwares/fetchuser.js')

router.get('/', (req, res) => {
    res.send('Server....')
})


router.post('/registeruser', async (req, res) => {

    try {

        const { name, email, password } = req.body

        //If name, email, and password not enterd
        if (!name || !email || !password) {
            res.status(422).json('please fill details')
        }


        //If user is already Exist
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.status(400).json('User Exist With This Email')
        }

        // hash password
        const saltRound = 10;
        const hasedPassword = await bcrypt.hash(req.body.password, saltRound)


        //newUser 
        const newUser = await new User({ name, email, password: hasedPassword, jwttokens: '' })

        //Genrating jwt Token when user signUP
        const jwttoken = jwt.sign({ id: newUser._id.toHexString() }, SECRET_KEY)
        newUser.jwttokens = jwttoken


        //Save new user Into DB
        const result = await newUser.save()

        res.status(200).send(newUser)


    } catch (error) {
        console.error(error.message)
        res.send('can\'t register user')
    }
})


router.post('/loginuser', async (req, res) => {
    try {
        const { email, password, jwttokens } = req.body

        //If email and password not enterd
        if (!email || !password) {
            return res.status(422).json({ error: "Please fill details" })
        }

        //find user with email
        const findUser = await User.findOne({ email })
        if (!findUser) {
            res.status(400).json('User Not Exist')
        }

        //password compare 
        const matchPassword = await bcrypt.compare(password, findUser.password)
        if (matchPassword) {
            res.status(200).send(findUser)
        } else {
            res.status(401).json('login failed')
        }


        const token = findUser.jwttokens
        const verifyToken = jwt.verify(token, SECRET_KEY)
        if (!verifyToken) {
            console.error('Invalid Token')
        }
        //finding User id from jwt
        const userId = verifyToken.id
        // res.send(token)
        // console.log(`user id is : ${userId}`)


    } catch (error) {
        console.error(error.message)
        res.send('can\'t login user')
    }
})


router.post('/forgot-password', (req, res) => {

})

router.post('/getuser', fetchuser, async (req, res) => {
    try {

        userId = await req.userId
        console.log(userId)

        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send('can\'t get user')
    }
})



module.exports = router