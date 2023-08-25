// routes/admin-posts.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/admin/posts', (req, res) => {
  connection.query('SELECT * FROM nka_posts', (error, posts) => {
    if (error) throw error;
    res.render('admin-posts', { posts });
  });
});

module.exports = router;
