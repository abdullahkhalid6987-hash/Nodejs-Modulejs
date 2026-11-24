const User = require('../models/users')

exports.getChangeRole = async (req, res, next) =>{
    const userId = req.params.userId.split(':')[1]
    const user = await User.findById(userId)
    res.render('userRole',{
        user,
        isLoggedIn: req.session.isLoggedIn
    })
}

exports.postChangeRole = async (req, res, next) =>{
    const userRole = req.body.role
    const userId = req.params.userId.split(':')[1]
    const user = await User.findByIdAndUpdate(userId, {role: userRole})
    res.redirect('/')
}