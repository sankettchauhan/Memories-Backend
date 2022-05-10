const mongoose = require("mongoose");
const Joi = require("joi");

const memorySchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  image,
  description,
});
