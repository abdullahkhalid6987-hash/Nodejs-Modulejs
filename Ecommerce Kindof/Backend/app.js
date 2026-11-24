import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './src/routes/user.route.js'
import productRouter from './src/routes/products.route.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}))

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true, limit:"5mb"}))
app.use('/api/v1/public',express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use((err, req, res, next) => {
    // Read properties from your ApiError class, or fall back to standard defaults
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong on the server";

    // CRUCIAL: It must use res.status().json() so the frontend receives pure JSON, never HTML strings
    return res.status(statusCode).json({
        statusCode: statusCode,
        success: false,
        message: message,
        errors: err.errors || []
    });
});

export {app}