import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("Connected to the database")
    } catch (error) {
        console.log("Connection to the db faild", error)
        //The process exit will exit the node process which is good to avoid the execution of the then block
        process.exit(1)
    }
}

export default connectDB