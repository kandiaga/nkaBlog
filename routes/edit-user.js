// routes/edit-user.js

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('../db'); 

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the update-post route
router.use(authMiddleware);

// GET route to render the update post form
router.get('/edit-user/:id_user', (req, res) => {
  const userIdCurrent = req.params.id_user;  
  const tenantDomain = req.DomainName;
    connection.query('SELECT * FROM nka_users WHERE id_user = ?', [userIdCurrent], (error, results) => {
      if (error) throw error;
      res.render('edit-user', {user:results[0], userId: req.session.userId,tenantDomain });
    });	
 
});




// POST route to update a post
router.post('/edit-user/:id_user', async (req, res) => {
  const  userIdCurrent = req.params.id_user;
  const { user_login, user_pass,user_nicename,user_email,user_url,display_name} = req.body;
  const hashedPassword = await bcrypt.hash(user_pass, 10); 
  
  const query = 'UPDATE nka_users SET user_login = ?, user_pass = ? , user_nicename = ?, user_email = ?, user_url = ?, display_name = ?  WHERE id_user = ?';

  connection.query(query, [user_login, hashedPassword,user_nicename,user_email,user_url,display_name, userIdCurrent], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/users');
  });
});

module.exports = router;




