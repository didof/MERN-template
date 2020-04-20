const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subcribedAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
        // if the password has been modified
        return next()
    }
    
    bcrypt.hash(this.password, 10, (err, hashed) => {
        if(err) return next(err)
        this.password = hashed
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)