const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");

//Register a User 
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { completeAddress,name, email, password,role } = req.body;
    const user = await User.create({
        completeAddress,name, email, password,role
    });

    sendToken(user, 201, res);
});


//login user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password,role } = req.body;

    //checking if user has given password and email both

    if (!email || !password || !role) {
        return next(new ErrorHander("Please Enter Email ,Password & role ", 400));
    }

    const user = await User.findOne({ email,role }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password ", 401))
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password ", 401))
    }


    sendToken(user, 200, res);
});



//Logout User 
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})



//Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
})


//get all transporters (admin)
exports.getAllTransporters = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find({role:"transporter"});

    res.status(200).json({
        success: true,
        users,
    });
});

//get single users (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander(`User does not exist with Id:${req.body.params}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});



