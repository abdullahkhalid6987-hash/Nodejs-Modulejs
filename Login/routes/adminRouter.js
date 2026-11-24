const express = require('express')

const adminController = require('../controller/adminController')
const adminRouter = express.Router()

adminRouter.get('/changeRole/:userId', adminController.getChangeRole)
adminRouter.post('/changeRole/:userId', adminController.postChangeRole)

module.exports = adminRouter