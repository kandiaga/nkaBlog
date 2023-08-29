// routes/edit-bloginfo.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); 

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the update-post route
router.use(authMiddleware);

// GET route to render the update post form
router.get('/edit-bloginfo/:id_blog', (req, res) => {
  const tenantDomain = req.DomainName;	
  const blogId = req.params.id_blog;  
    connection.query('SELECT * FROM nka_blogs WHERE id_blog= ?', [blogId], (error, results) => {
      if (error) throw error;
      res.render('edit-bloginfo', {blog:results[0], userId: req.session.userId,tenantDomain });
    });	
 
});




// POST route to update a post
router.post('/edit-bloginfo/:id_blog', (req, res) => {
	const tenantDomain = req.DomainName;	
  const blogId = req.params.id_blog;
  const { blog_title, blog_description } = req.body;
  
  const query = 'UPDATE nka_blogs SET title = ?, description = ?  WHERE id_blog = ?';

  connection.query(query, [blog_title, blog_description, blogId], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/blog');
  });
});

module.exports = router;




