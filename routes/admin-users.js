// routes/adin-users.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/admin/users', (req, res) => {
	const tenantDomain = '';
  connection.query('SELECT * FROM nka_users', (error, results) => {
    if (error) throw error;
    res.render('admin-users', { users: results ,tenantDomain});
  });
});

module.exports = router;
