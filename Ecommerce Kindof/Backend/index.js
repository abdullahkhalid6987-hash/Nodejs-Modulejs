import dotenv from 'dotenv'
import connectDB from './src/db/index.js'
import { app } from './app.js'

dotenv.config({
    path: "./.env"
})

connectDB()
.then( () => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`The server is running at port ${process.env.PORT || 8000}`)
    })
})
.catch( error => {
    //This catch block is not needed
    console.log("MongoDB connection failed !!!", error )
})

