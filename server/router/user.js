const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY
const fetchuser = require('../middelwares/fetchuser.js')
const { check, validationResult } = require('express-validator');


router.get('/', (req, res) => {
    res.send('Server.....')
})


router.post('/registeruser', [
    check('name', 'Name Must Be At Least 2 Characters.').isLength({ min: 2 }),
    check('email', 'Email Is Not Valid').isEmail(),
    check('password', 'Password Must Be At Least 5 Characters.').isLength({ min: 5 })
], async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(401).json(errors)
        }
        else {

            const { name, email, password } = req.body

            //If name, email, and password not enterd
            if (!name || !email || !password) {
                res.status(422).json('please fill details')
            }
            else {

                //If user is already Exist
                const userExist = await User.findOne({ email })
                if (userExist) {
                    res.status(400).json('User Exist With This Email')
                }
                else {


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
                }
            }
        }
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
        else {

            //find user with email
            const findUser = await User.findOne({ email })
            if (!findUser) {
                res.status(400).json('User Not Exist')
            }
            else {

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
            }
        }
    } catch (error) {
        console.error(error.message)
        res.send('can\'t login user')
    }
})


router.post('/user-profile-photo', (req, res) => {

})

router.post('/getuser', fetchuser, async (req, res) => {
    try {

        userId = await req.userId
        const user = await User.findById(userId).select('-password')
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send('can\'t get user')
    }
})



module.exports = router