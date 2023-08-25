// routes/categories.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

router.get('/categories', (req, res) => {
  connection.query('SELECT * FROM nka_categories', (error, results) => {
    if (error) throw error;
    res.render('categories', { categories: results });
  });
});

module.exports = router;
