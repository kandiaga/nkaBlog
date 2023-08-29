// routes/add-category.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust the path if needed

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);

router.get('/add-category', (req, res) => {
 const  userId=req.session.userId;
  connection.query('SELECT  id_blog, id_tenant FROM nka_blogs  WHERE id_user = ?',[userId], (error,  blog_datas) => {
    if (error) throw error;
    res.render('add-category', { blog_data:blog_datas[0] ,userId:req.session.userId});
  });
  
});

router.post('/add-category', (req, res) => {
  const  userId=req.session.userId;	
  const { category_title, category_description,id_blog,id_tenant} = req.body;
  const query = 'INSERT INTO nka_categories (category_title, category_description,id_blog,id_tenant,id_user) VALUES (?, ?,?,?,?)';
  
  connection.query(query, [category_title, category_description,id_blog,id_tenant, userId], (error, results) => {
    if (error) throw error;
    //res.redirect('/categories');
	res.redirect('/admin/categories');
  });
});

module.exports = router;
