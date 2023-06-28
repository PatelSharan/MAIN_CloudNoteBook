const dotevn = require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const connectDB = require('./connectDB/connectDB.js')
const DB_URL = process.env.DB_URL
const routerUser = require('./router/user.js')
const routerNote = require('./router/note.js')
const cors = require('cors')


app.use(express.json())
app.use(cors())


//Connect With DB
connectDB(DB_URL)



//User Routes 
app.get('/', routerUser)
app.post('/registeruser', routerUser)
app.post('/loginuser', routerUser)


//Notes Routes 
app.get('/getnotes', routerNote)
app.post('/addnote', routerNote)
app.put('/updatenote/:id', routerNote)
app.delete('/deletenote/:id', routerNote)


//Server Listening
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})