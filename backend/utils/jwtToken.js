//create token and saving in cookie
const sendToken = (user, statuscode, res) => {
  //change
  const token = user.getJWTToken(); //change

  //options for cookie

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    user, //change
    token,
  });
};

module.exports = sendToken;
