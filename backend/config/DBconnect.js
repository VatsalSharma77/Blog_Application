const mongoose = require("mongoose");

const DBconnect = async () => {
    await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");
  
};

module.exports = DBconnect;
