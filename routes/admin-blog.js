// routes/adin-home.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/admin/blog', (req, res) => {	 
	const userId=req.session.userId;
	const tenantDomain = req.DomainName;
	const page_name='Admin Blog';
  connection.query('SELECT * FROM nka_blogs WHERE id_user = ?', [userId], (error, blogs) => {
    if (error) throw error;
    res.render('admin-blog', { blog: blogs[0] ,page_name,tenantDomain});
  });
});

module.exports = router;
