// routes/adin-home.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/admin/home', (req, res) => {	 
	const userId=req.session.userId;
	
  connection.query('SELECT * FROM nka_tenants WHERE id_user = ?', [userId], (error, tenants) => {
    if (error) throw error;
	const tenantDomain =tenants[0].domain;
    res.render('admin-home', { tenant: tenants[0], tenantDomain});
  });
});

module.exports = router;
