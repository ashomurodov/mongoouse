const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log(`Mongoose connected with server: ${data.connection.host}`);
    });
};

module.exports = connectToDatabase;
