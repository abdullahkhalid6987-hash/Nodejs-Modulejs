const express = require('express')
const adminController = require('../controllers/adminController')

const adminRouter = express.Router()

adminRouter.get('/students', adminController.getAdminPage)
adminRouter.get('/add-student', adminController.getAddStudent)
adminRouter.post('/add-student', adminController.postAddStudent)
adminRouter.post('/delete-student/:studentId', adminController.deleteStudent)
adminRouter.get('/add-student/:studentId', adminController.getEditStudent)
adminRouter.post('/add-student/:studentId', adminController.postEditStudent)

module.exports = adminRouter