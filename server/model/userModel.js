const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');




//user Scheema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name of the user is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,

        validate: [validator.isEmail, 'Please provide a valid email']
    },
    department: {
        type: String,

        default: ""
    },
    designation: {
        type: String,

        default: ""
    },
    contact: {
        type: Number,
        default: ""
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlenght: 4,
        select: false
    },
    passowrdConfirm: {
        type: String,
        reuired: [true, 'Please confirm your password'],
        minlenght: 4,
        validate: {
            validator: function (el) {
                return el === el.password
            },
            message: 'Password were not the same'
        }
    },
    passwordChangeAt: Date,
    passwordResetToken: Date,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})


//PRE - MIDDLEWARES

//Converting password using bcrypt
userSchema.pre('save', async function(next){
    //converting if not modified
    if(!this.isModified('password')) return next();

    //converting if modified
    this.password = await bcrypt.hash(this.password, 12);
    this.passowrdConfirm = undefined;

    next();
})

//updating the timestamp when password changes
userSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangeAt = Date.now() - 1000;

    next();
})


//Finding users excluding deactivated ones
userSchema.pre(/^find/, function(next){
    this.find({active: { $ne: false }});

    next();
})





//METHODS MIDDLEWARES


//Checking if candidate password and user password is the same
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
};


//Checking and validation if passwordChangeAt is changed every time password was change
userSchema.methods.changePassword = function(JWTTimestamp) {
    if(this.passwordChangeAt) {
        const changeTimeStamp = parseInt (this.passwordChangeAt.getTime() / 1000, 10)
        return JWTTimestamp < changeTimeStamp;
    }
    return false;
}


//Creating token for resetting password
userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    //checking the reset Token
    console.log({resetToken}, this.passwordResetToken);

    return resetToken;
}




//Creating User Model at atlas
const User = mongoose.model('Users', userSchema);

//Exporting User Scheema
module.exports = User;



