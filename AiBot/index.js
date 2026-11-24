import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({
    path:'./.env'
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`The server is running on the port number ${process.env.PORT || 3000}`)
})
