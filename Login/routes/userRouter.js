const express = require('express')

const userController = require('../controller/userController')
const userRouter = express.Router()

userRouter.get('/', userController.getHome)
userRouter.get('/login', userController.getLogin)
userRouter.get('/signup', userController.getSignup)
userRouter.get('/logout', userController.getLogout)
userRouter.post('/login', userController.postLogin)
userRouter.post('/signup', userController.postSignup)

module.exports = userRouter