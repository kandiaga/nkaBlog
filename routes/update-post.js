// routes/update-post.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); 

const multer = require('multer'); 

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the update-post route
router.use(authMiddleware);




// GET route to render the update post form
router.get('/update-post/:post_id', (req, res) => {
  const postId = req.params.post_id;  
  const tenantDomain = req.DomainName;
  connection.query('SELECT * FROM nka_categories', (error, categories) => {
	  if (error) throw error;    
    // Assuming you have a function to retrieve the post data by ID
    connection.query('SELECT * FROM nka_posts WHERE id_post = ?', [postId], (error, results) => {
      if (error) throw error;
      res.render('update-post', { categories, post:results[0], userId: req.session.userId,tenantDomain });
    });
  });
});

// POST route to update a post
router.post('/update-post/:post_id', (req, res) => {
  const postId = req.params.post_id;
 
  const { post_title, post_content, post_excerpt, id_category, post_date, post_modified } = req.body;
  
  const query = 'UPDATE nka_posts SET post_title = ?, post_content = ?, post_excerpt = ?, id_category = ?, post_date = NOW(), post_modified = NOW() WHERE id_post = ?';

  connection.query(query, [post_title, post_content, post_excerpt, id_category, postId], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/posts');
  });
});

module.exports = router;




