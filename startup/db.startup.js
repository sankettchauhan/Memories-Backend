const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config");

module.exports = async function connection() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(MONGODB_URI, connectionParams);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database");
  }
};
