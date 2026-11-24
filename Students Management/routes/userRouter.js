const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')

userRouter.get('/', userController.getHome)
userRouter.get('/students', userController.getStudents)
userRouter.get('/best-students', userController.getBestStudents)
userRouter.post('/best-students/:studentId', userController.postBestStudents)
userRouter.post('/remove-best-students/:studentId', userController.removeBestStudent)
userRouter.get('/student-detail/:studentId', userController.getStudentDetails)

module.exports = userRouter