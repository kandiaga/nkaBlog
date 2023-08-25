// routes/delete-category.js

const express = require('express');
const router = express.Router();
const connection = require('../db');

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the delete-post route
router.use(authMiddleware);

// POST route to delete a post
router.get('/delete-category/:id_category', (req, res) => {
  const categoryId = req.params.id_category;

  const query = 'DELETE FROM nka_categories WHERE id_category = ?';

  connection.query(query, [categoryId], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/categories');
  });
});

module.exports = router;
