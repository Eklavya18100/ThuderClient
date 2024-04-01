const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Route to fetch assignment submissions
app.post("/api/submissions/:courseId/:assignmentId", async (req, res) => {
  try {
    const token = req.query.token;
    const { courseId, assignmentId } = req.params;
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.CANVAS_API_URL}courses/${
        courseId ? courseId : "1"
      }/assignments/${
        assignmentId ? assignmentId : "1"
      }/submissions?include[]=submission_comments`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch assignment submissions" });
  }
});
app.put(
  "/api/submissions/:courseId/:assignmentId/:userId",
  async (req, res) => {
    try {
      const { token, comment } = req.query;
      const { courseId, assignmentId, userId } = req.params;
      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }
      const config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.CANVAS_API_URL}courses/${
          courseId ? courseId : "1"
        }/assignments/${assignmentId ? assignmentId : "1"}/submissions/${
          userId ? userId : "1"
        }?comment[text_comment]=${comment}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config.url,req.query);

      const response = await axios.request(config);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);
app.delete(
  "/api/submissions/:courseId/:assignmentId/:submissionId/:commentId",
  async (req, res) => {
    try {
      const token = req.query.token;
      const { courseId, assignmentId, submissionId, commentId } = req.params;
      if (!token) {
        return res.status(400).json({ error: "Token is required" });
      }
      const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.CANVAS_API_URL}courses/${
          courseId ? courseId : "1"
        }/assignments/${assignmentId ? assignmentId : "1"}/submissions/${
          submissionId ? submissionId : "1"
        }/comments/${commentId ? commentId : "1"}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
