const express = require("express");
require("dotenv").config();
const connectToDatabase = require("./configs/database");

const app = express();

app.use(express.json())
// app.use((req, res, next) => {
//   res.sendStatus(404);
// });

// Routes
app.use("/auth", require("./routes/userRouter"));

const PORT = process.env.PORT || 3001;

connectToDatabase();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
