const fast2sms = require("fast-two-sms");
const { FAST2SMS } = require("../config");
const { SMS_NOT_SENT } = require("../errors");

exports.generateOTP = () => {
  // Declare a digits variable
  // which stores all digits
  let OTP = String(Math.floor(100000 + Math.random() * 900000));
  return OTP;
};

exports.fast2sms = async ({ message, contactNumber }, next) => {
  try {
    const res = await fast2sms.sendMessage({
      authorization: FAST2SMS,
      message,
      numbers: [contactNumber],
    });
    if (!res.return)
      next({
        error: SMS_NOT_SENT,
        message: res.message,
        status: res.status_code,
      });
  } catch (error) {
    next(error);
  }
};
