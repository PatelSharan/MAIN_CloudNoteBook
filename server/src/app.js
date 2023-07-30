import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js'
import routerUser from './router/user.js'
import routerNote from './router/note.js'
import fetchuser from './middelwares/fetchuser.js'
const app = express()
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT

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
app.post('/changepassword', routerUser)
app.post('/getuser', fetchuser, routerUser)


//Notes Routes 
app.post('/addnote', fetchuser, routerNote)
app.get('/getnotes', fetchuser, routerNote)
app.put('/updatenote/:id', fetchuser, routerNote)
app.delete('/deletenote/:id', routerNote)


//Server Listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})