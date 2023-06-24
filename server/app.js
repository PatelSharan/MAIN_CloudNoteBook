const dotevn = require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const connectDB = require('./connectDB/connectDB.js')
const DB_URL = process.env.DB_URL
const routerUser = require('./router/user.js')



app.use(express.json())


//Connect With DB
connectDB(DB_URL)



//Routes
app.get('/', routerUser)

app.post('/registeruser', routerUser)


//Server Listening
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})