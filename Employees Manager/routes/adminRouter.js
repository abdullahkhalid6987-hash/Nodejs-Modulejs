const express = require('express')
const adminRouter = express.Router()
const adminController = require('../controllers/adminController')

adminRouter.get('/', adminController.getAdmin)
adminRouter.get('/add-employee', adminController.getAddEmployee)
adminRouter.get('/employees', adminController.getEmployee)
adminRouter.post('/employees', adminController.postEmployee)
adminRouter.get('/edit-employee/:employeeId', adminController.getEditEmployee)
adminRouter.get('/best-employees/:employeeId', adminController.postBestEmployee)

module.exports = adminRouter;