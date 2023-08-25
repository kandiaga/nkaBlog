// routes/adin-users.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/admin/home', (req, res) => {
  connection.query('SELECT * FROM nka_users', (error, results) => {
    if (error) throw error;
    res.render('admin-home', { users: results });
  });
});

module.exports = router;
