const path = require('path')
const express = require('express')
const app = express()
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const errorRouter = require('./routes/errorRouter')
const rootDir = require('./utils/pathutils')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(rootDir, "public")))

app.use(express.urlencoded())

app.use(userRouter)
app.use('/admin', adminRouter)
app.use(errorRouter)

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`The server is listening at ${PORT}`)
})