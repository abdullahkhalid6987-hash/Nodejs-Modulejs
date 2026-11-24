const path = require('path')
const express = require('express')
const app = express()

const userRouter = require('./routes/userRouter')
const amdinRouter = require('./routes/adminRouter')
const rootDir = require('./utils/pathutil')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(rootDir, "public")))

app.use(express.urlencoded())

app.use(userRouter)
app.use('/admin', amdinRouter)

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`The server is listening on https://localhost:${PORT}`)
})