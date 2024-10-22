const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel"); //change
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    //change
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
      //public_id: "this is a sample id",
      //url: "profilepicurl",
    },
  });

  sendToken(user, 201, res); //change
});

//Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking user has given both
  if (!email || !password) {
    return next(new ErrorHandler("please enter", 400));
  }

  const user = await User.findOne({ email }).select("+password"); //+password because password:false was given
  //change

  if (!user) {
    //change
    return next(new ErrorHandler("invalid email or pass", 401));
  }

  const isPasswordMatched = await user.comparePassword(password); //change

  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid email or pass", 401));
  }

  sendToken(user, 200, res); //change
});

//logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }); //change
  if (!user) {
    //change
    return next(new ErrorHandler("user not found", 404));
  }

  //get reset password token
  const resetToken = user.getResetPassToken(); //change

  await user.save({ validateBeforeSave: false }); //change

  const resetpassUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`; /*`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;*/

  const message = `Your password reset token is :-\n\n${resetpassUrl}\n\n if you have not requested this email then please ignore it`;

  try {
    await sendEmail({
      email: user.email, //change
      subject: `password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `email send to ${user.email} successfully`, //change
    });
  } catch (error) {
    user.resetPasswordToken = undefined; //change
    user.resetPasswordExpire = undefined; //change

    await user.save({ validateBeforeSave: false }); //change

    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    //change
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    //change
    return next(
      new ErrorHandler("reset password token is invalid or expired", 400)
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("password doesnot match", 400));
  }

  user.password = req.body.password; //change
  user.resetPasswordToken = undefined; //change
  user.resetPasswordExpire = undefined; //change

  await user.save(); //change

  sendToken(user, 200, res); //change
});

//get user(my) details
exports.getuserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id); //change

  res.status(200).json({
    success: true,
    user, //change
  });
});

//update user password
exports.updatePass = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password"); //change

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword); //change

  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid old pass", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password doesnot match", 400));
  }

  user.password = req.body.newPassword; //change

  await user.save(); //change

  sendToken(user, 200, res); //change
});

//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newuserData = {
    name: req.body.name,
    email: req.body.email,
  }; //we will add cloudinary (avatar option) later now added

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newuserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newuserData, {
    //change
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//get all users --admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find(); //change

  res.status(200).json({
    success: true,
    users, //change
  });
});

//get single user --admin
exports.getSingleUsers = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id); //change

  if (!user) {
    //change
    return next(
      new ErrorHandler(`user does not exist with id:${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user, //change
  });
});

//update user role--admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newuserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  /*const user = */ await User.findByIdAndUpdate(req.params.id, newuserData, {
    //change
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // if (!user) {
  //   //change
  //   return next(
  //     new ErrorHandler(`user does not exist with id:${req.params.id}`, 400)
  //   );
  // }

  res.status(200).json({
    success: true,
  });
});

//delete user--admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id); //change

  if (!user) {
    //change
    return next(
      new ErrorHandler(`user does not exist with id:${req.params.id}`, 400)
    );
  }

  //we will remove cloudinary later now removed
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId); //till this

  await user.deleteOne(); //remove()is deprecated
  //change

  res.status(200).json({
    success: true,
    message: "user deleted",
  });
});
