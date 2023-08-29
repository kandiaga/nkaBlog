// routes/categories.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/admin/categories', (req, res) => {
	const tenantDomain ='';
  connection.query('SELECT * FROM nka_categories', (error, results) => {
    if (error) throw error;
    res.render('admin-categories', { categories: results,tenantDomain });
  });
});

module.exports = router;
