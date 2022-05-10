const { model, Schema } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phoneOtp: String,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

function validateUserSignup(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    phone: Joi.string().length(10).required(),
  });
  return schema.validate(user);
}

function validateUserLogin(user) {
  const schema = Joi.object({
    phone: Joi.string().length(10).required(),
  });
  return schema.validate(user);
}

function validateOTP(requestBody) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    otp: Joi.string().length(6).required(),
  });
  return schema.validate(requestBody);
}

module.exports = { User, validateUserSignup, validateUserLogin, validateOTP };
