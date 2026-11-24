const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: String,
    email: {type:String, required:true},
    password: {type:String, required:true},
    gender: {
        type:String,
        required: true,
        enum: ['male', 'female'],
        default: 'male'
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'employee', 'admin'],
        default: 'user'
    }
})

module.exports = mongoose.model('Users', userSchema)