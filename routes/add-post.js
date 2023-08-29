// routes/add-post.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); 
//const Post = require('../models/Post');

const multer = require('multer'); 

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);




router.get('/add-post', (req, res) => {
	const userId=req.session.userId;
  connection.query('SELECT * FROM nka_categories', (error1, categories) => {
    if (error1) throw error1;

    // Perform another query
   connection.query('SELECT  id_blog, id_tenant FROM nka_blogs  WHERE id_user = ?',[userId], (error2,  blog_datas) => {
      if (error2) throw error2;

      res.render('add-post', { categories, blog_data:blog_datas[0], userId: req.session.userId });
    });
  });
});






//const DomainName='ndiaga';


// Configure multer to handle file uploads
const storage = multer.diskStorage({
	
  destination: function (req, file, cb) {
    const  userId=req.session.userId;		
	
	connection.query('SELECT domain FROM nka_tenants  WHERE  id_user=? ',[userId], (error, results) => {
  if (error) throw error;

  if (results.length > 0) {
    const DomainName = results[0].domain;
    // Use the DomainName variable for further processing
    cb(null, `public/uploads/${DomainName}`);
  } else {
    // Handle the case where no data is found
    cb(new Error('DomainName not found'));
  }
});
	
	
	
	

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename
  }
});
const upload = multer({ storage: storage });


router.post('/add-post',upload.single('post_image'), (req, res) => { 
 const  userId=req.session.userId;	
 
  const postImage = req.file ? req.file.filename : 'default.jpg'; // Get the uploaded image filename
  //const postImage = req.file.filename;	
  const { post_title, post_content,post_excerpt,id_category,id_blog,id_tenant,post_date,post_modified} = req.body;
  const query = 'INSERT INTO nka_posts (post_title, post_content,post_excerpt,id_category,post_image,id_blog,id_tenant,id_user, post_date,post_modified) VALUES (?, ?,?,?,?,?,?,?, NOW(), NOW())';
  
  connection.query(query, [post_title, post_content,post_excerpt,id_category,postImage,id_blog,id_tenant, userId, post_date,post_modified], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/posts');	
	
  });
});




module.exports = router;
