const { Memory } = require("../models/memory.model");

exports.createMemory = async (req, res, next) => {
  try {
    const { _id: userId } = res.locals.user;
    let memory = { ...req.body, user: userId };
    memory = new Memory(memory);
    memory = await memory.save();
    res.status(200).send(memory);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllPublicMemories = async (req, res, next) => {
  // get all memories, filter those are public
  try {
    const memories = await Memory.find({ isPrivate: false });
    return res.status(200).json({ data: memories });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.retrieveMemories = async (req, res, next) => {
  try {
    const { _id: userId } = res.locals.user;
    const memories = await Memory.find({ user: userId });
    return res.status(200).json({ data: memories });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
