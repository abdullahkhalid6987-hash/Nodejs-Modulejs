const express = require('express')
const userController = require('../controllers/userController')

const userRouter = express.Router()

userRouter.get('/', userController.getHomePage)
userRouter.get('/dashboard', userController.getDashBoard)
userRouter.get('/employees', userController.getEmployees)
userRouter.get('/best-employees', userController.getBestEmployees)
userRouter.get('/employee-details/:employeeId', userController.getEmployeeDetail)

module.exports = userRouter
