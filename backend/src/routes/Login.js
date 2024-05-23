const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/verifyEmailPassword", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  const query = 'SELECT user_id FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 1) {
      const user_id = results[0].user_id;
      res.json({ user_id, success: true });
    } else {
      res.json({ success: false });
    }
  });
});

module.exports = router;