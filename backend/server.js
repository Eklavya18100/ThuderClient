const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
// const db = require('./src/database/db');

// Route to fetch assignment submissions
app.use("/api/submissions", require("./src/routes/SubmissionRoutes"));
app.use("/api/assignments", require("./src/routes/Assignments"));
app.use("/api/login",require("./src/routes/Login"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});