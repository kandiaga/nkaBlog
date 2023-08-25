// routes/delete-post.js

const express = require('express');
const router = express.Router();
const connection = require('../db');

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the delete-post route
router.use(authMiddleware);

// POST route to delete a post
router.get('/delete-post/:id_post', (req, res) => {
  const postId = req.params.id_post;

  const query = 'DELETE FROM nka_posts WHERE id_post = ?';

  connection.query(query, [postId], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/posts');
  });
});

module.exports = router;
