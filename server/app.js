const dotevn = require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const connectDB = require('./connectDB/connectDB.js')
const DB_URL = process.env.DB_URL
const routerUser = require('./router/user.js')
const routerNote = require('./router/note.js')
const cors = require('cors')
const fetchuser = require('./middelwares/fetchuser.js')


app.use(express.json())
app.use(cors({
    origin: '*'
}))


//Connect With DB
connectDB(DB_URL)



//User Routes 
app.get('/', routerUser)
app.post('/registeruser', routerUser)
app.post('/loginuser', routerUser)
app.post('/user-profile-photo', routerUser)
app.post('/getuser', fetchuser, routerUser)


//Notes Routes 
app.post('/addnote', fetchuser, routerNote)
app.get('/getnotes', fetchuser, routerNote)
app.put('/updatenote/:id', fetchuser, routerNote)
app.delete('/deletenote/:id', routerNote)


//Server Listening
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})