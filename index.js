const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

// middle ware  
app.use(express.json());
// database connrction
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Import router
const authRoute = require("./routes/auth");

// rorute middleWare
app.use("/api/user", authRoute);

app.listen(3000, () => {
  console.log("Server runnung port 3000");
});
