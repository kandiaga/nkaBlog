// routes/admin-posts.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/admin/posts', (req, res) => {
	 const  userId=req.session.userId;		 
	 const   blogId=req.BlogId;
	 connection.query('SELECT * FROM nka_tenants  WHERE  id_user=? ',[userId], (error1, domain_data) => {
	 if (error1) throw error1;	 
	 const tenantDomain =domain_data[0].domain;
  connection.query('SELECT * FROM nka_posts', (error2, posts) => {
    if (error2) throw error2;	
    res.render('admin-posts', { posts , tenantDomain});
  });
  
  });
  
});

module.exports = router;
