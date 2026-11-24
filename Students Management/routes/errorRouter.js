const express = require('express')
const errorRouter = express.Router()

errorRouter.use((req, res, next)=>{
    res.render('404', {
        pageName: 'Page Not Found'
    })
})

module.exports = errorRouter