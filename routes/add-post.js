// routes/add-post.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); 

const multer = require('multer'); 

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the add-post route
router.use(authMiddleware);



router.get('/add-post',(req, res) => {
  connection.query('SELECT * FROM nka_categories', (error, categories) => {
    if (error) throw error;
    res.render('add-post', { categories ,userId:req.session.userId});
  });
});



// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Set the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename
  }
});
const upload = multer({ storage: storage });


router.post('/add-post',upload.single('post_image'), (req, res) => { 	
 
  const postImage = req.file ? req.file.filename : 'default.jpg'; // Get the uploaded image filename
  //const postImage = req.file.filename;	
  const { post_title, post_content,post_excerpt,id_category, post_date,post_modified} = req.body;
  const query = 'INSERT INTO nka_posts (post_title, post_content,post_excerpt,id_category,post_image, post_date,post_modified) VALUES (?, ?,?,?,?, NOW(), NOW())';
  
  connection.query(query, [post_title, post_content,post_excerpt,id_category,postImage, post_date,post_modified], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/posts');	
	
  });
});




module.exports = router;
