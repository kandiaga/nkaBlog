// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db');


// User Registration
router.get('/register', (req, res) => {
  const page_name='Register';		
  res.render('register',{page_name:page_name,userId:req.session.userId}); // Create the register view
});

router.post('/register', async (req, res) => {
  const { user_login, user_pass,user_nicename,user_email,user_url,display_name} = req.body;
  const hashedPassword = await bcrypt.hash(user_pass, 10); // Hash the password
  const id_tenant=1;

  const query = 'INSERT INTO nka_users (user_login, user_pass,user_nicename,user_email,user_url,display_name,id_tenant,user_registered) VALUES (?, ?,?, ?,?, ?,?, NOW())';
  connection.query(query, [user_login, hashedPassword,user_nicename,user_email,user_url,display_name,id_tenant], (error, results) => {
    if (error) throw error;
    res.redirect('/login');
  });
});

// User Login
router.get('/login', (req, res) => {
  const page_name='Login';	
  res.render('login', {page_name:page_name, userId:req.session.userId}); // Create the login view
});

router.post('/login', async (req, res) => {
  const { user_login, user_pass } = req.body;
  const query = 'SELECT * FROM nka_users WHERE user_login = ?';
  
  connection.query(query, [user_login], async (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      const user = results[0];
      const isPasswordMatch = await bcrypt.compare(user_pass, user.user_pass);

      if (isPasswordMatch) {
        req.session.userId = user.id_user; // Store user ID in session
        res.redirect('/admin/home'); // Redirect to admin dashboard
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  });
});


 


module.exports = router;
