// routes/add-user.js

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/add-user', (req, res) => {
  res.render('add-user');
});

router.post('/add-user', async (req, res) => {
  const { user_login, user_pass,user_nicename,user_email,user_url,display_name} = req.body;
  const hashedPassword = await bcrypt.hash(user_pass, 10); 
  

  const query = 'INSERT INTO nka_users (user_login, user_pass,user_nicename,user_email,user_url,display_name,user_registered) VALUES (?, ?,?, ?,?, ?, NOW())';
  
  connection.query(query, [user_login, hashedPassword,user_nicename,user_email,user_url,display_name], (error, results) => {
    if (error) throw error;
    
	res.redirect('/admin/users');
  });
});

module.exports = router;
