const crypto = require('crypto');
const { promisify } = require('util');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');





//creating signed Token for authentication

const signToken = id => {
    return jwt.sign({ id }, 'this_is_secret_code_for_jwt_authentication', { expiresIn: '90d' });
};



//sending token to cookies
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    // if (process.env.NODE_ENV === 'production') 
    cookieOptions.secure = true

    res.cookie('jwt', token, cookieOptions);
    //setting password hidden
    user.password = undefined;


    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    })
}



//sign up user controller
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        employeeID: req.body.employeeID,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.password,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role
    })

    createSendToken(newUser, 201, res);
})




//login user controller
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body


    //Error if either email or password is not provided
    if (!email || !password) {
        return next(new AppError('Please provide email or password', 400))
    }

    //finding the user email and selecting password
    const user = await User.findOne({ email }).select('+password');


    //checking if the user password is same with bcrypt password
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }

    createSendToken(user, 201, res);
})




//protecting product routes
exports.protect = catchAsync(async (req, res, next) => {
    let token;
    //getting token and check if exist
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access', 401))
    }

    //verification of token
    const decoded = await promisify(jwt.verify)(token, 'this_is_secret_code_for_jwt_authentication')


    //check if user still exists, if user is not deleted
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
        return next(new AppError('The user no longer exist', 401))
    }

    //check if user changed password after the jwt was issued
    if (currentUser.changePassword(decoded.iat)) {
        return next(new AppError('User ecently changed password, please login again', 401))
    };


    //grant access to protected routes
    req.user = currentUser
    next()
})

//Role restriction, giving access to controllers
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        next();
    }
}

//forgot password controller
exports.forgotPassword = catchAsync(async (req, res, next) => {
    //get user based on POSTED email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }

    //generate random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });


    //function to send email to user
    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/user/forgotpassword/${resetToken}`;

    const message = `Forgot your password? 
  Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.
  \nIf you didn't forget your password, please ignore this email!`;

    try {
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
});





//reset password controller
exports.resetPassword = catchAsync(async (req, res, next) => {
    //get user based on token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    //if token has not expired, set new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();


    //update changedPasswordAt property for the user

    //Log the user in, send JWT
    createSendToken(User, 201, res);
});




exports.updatePassword = catchAsync(async (req, res, next) => {
    //getting user from collection
    const user = await User.findById(req.user.id).select('+password');

    //check if POSTED password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong', 401));
    }


    //if password was correct, update the password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    await user.save();

    //log user in, send JWT
    createSendToken(User, 201, res);
})
