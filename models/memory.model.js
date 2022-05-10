const mongoose = require("mongoose");
const Joi = require("joi");

const memorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
});

const Memory = mongoose.model("Memory", memorySchema);

function validateMemory(memory) {
  const schema = Joi.object({
    title: Joi.string().required(),
    isPrivate: Joi.bool().required(),
    image: Joi.string(),
    description: Joi.string(),
  });
  return schema.validate(memory);
}

module.exports = { Memory, validateMemory };
