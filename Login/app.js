const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const errorRouter = require('./routes/errorRouter')

const app = express()
const DB_PATH = "mongodb://localhost:27017"

const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
})

app.use(session({
    secret:'Coding',
    resave: false,
    saveUninitialized: true,
    store
}))

app.use(express.urlencoded())
app.use(express.static(path.join('./', 'public')))
app.set('view engine', 'ejs')
app.set('views')

app.use(userRouter)
app.use(adminRouter)
app.use(errorRouter)

const PORT = 3000

mongoose.connect(DB_PATH).then(()=>{
    console.log(`Connected to MongoDB`)
    app.listen(PORT, ()=>{
        console.log(`The server has started and is listening at https://localhost:${PORT}`)
    })
}).catch(err =>{
    console.log('Connection failed. There was an error.', err)
})