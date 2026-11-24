const express = require('express')

const errorRouter = express.Router()

errorRouter.use((req, res, next) => {
    res.render('error404')
})

module.exports = errorRouter