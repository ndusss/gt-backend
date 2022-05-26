require("dotenv").config();

const express = require("express");
const cors = require('cors')
const app = express();

// AVOID CORS
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

// MIDDLEWARE
app.use(express.json()); // parse json bodies in the request object

// REDIRECT REQUESTS
// -- to endpoint starting with /post
app.use("/post", require("./routes/post"));
// -- to endpoint starting with /comment
app.use("/comment", require("./routes/comment"));

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));