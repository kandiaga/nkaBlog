// routes/edit-category.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); 

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the update-post route
router.use(authMiddleware);

// GET route to render the update post form
router.get('/edit-category/:id_category', (req, res) => {
  const categoryId = req.params.id_category; 
  const tenantDomain = req.DomainName;
    connection.query('SELECT * FROM nka_categories WHERE id_category = ?', [categoryId], (error, results) => {
      if (error) throw error;
      res.render('edit-category', {category:results[0], userId: req.session.userId,tenantDomain });
    });	
 
});




// POST route to update a post
router.post('/edit-category/:id_category', (req, res) => {
  const categoryId = req.params.id_category;
  const { category_title, category_description } = req.body;
  
  const query = 'UPDATE nka_categories SET category_title = ?, category_description = ?  WHERE id_category = ?';

  connection.query(query, [category_title, category_description, categoryId], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/categories');
  });
});

module.exports = router;




