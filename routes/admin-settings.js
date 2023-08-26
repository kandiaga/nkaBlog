// routes/adin-home.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/admin/settings', (req, res) => {	 
	const userId=req.session.userId;
  connection.query('SELECT * FROM nka_tenants WHERE id_user = ?', [userId], (error, tenants) => {
    if (error) throw error;
    res.render('admin-settings', { tenant: tenants[0] });
  });
});

module.exports = router;
