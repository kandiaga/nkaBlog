// routes/add-category.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/add-category', (req, res) => {
  res.render('add-category');
});

router.post('/add-category', (req, res) => {
  const { category_title, category_description } = req.body;
  const query = 'INSERT INTO nka_categories (category_title, category_description) VALUES (?, ?)';
  
  connection.query(query, [category_title, category_description], (error, results) => {
    if (error) throw error;
    //res.redirect('/categories');
	res.redirect('/admin/categories');
  });
});

module.exports = router;
