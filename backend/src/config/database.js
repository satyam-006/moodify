const mongoose = require("mongoose");

async function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(`Database connection failed ${err}`);
    });
}

module.exports = connectToDB