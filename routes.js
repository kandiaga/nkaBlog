const express = require('express');
const router = express.Router();
const connection = require('./db.js');





router.get('/test-db-connection', (req, res) => {
  connection.query('SELECT * FROM nka_posts', (error, results) => {
    if (error) {
      res.send('Database connection error');
    } else {
      res.send('Database connection successful');
    }
  });
});



router.get('/', (req, res) => {
  const page_name='Home';	
  post=null;
  category_title=null;
  connection.query('SELECT * FROM nka_posts', (error, results) => {
    if (error) throw error;
    res.render('index', { posts: results,page_name:page_name ,userId:req.session.userId, post:post,category_title:category_title});
  });
});


router.get('/category/:id', (req, res) => {
  const categoryId= req.params.id; 
	
	connection.query('SELECT category_title FROM nka_categories WHERE id_category = ?',[categoryId], (error, category_name) => {
		if (error) throw error;
		category_title=category_name[0].category_title;
    
  });	
	
  const page_name='Home';	   
  connection.query('SELECT * FROM nka_posts WHERE id_category = ?',[categoryId], (error, results) => {
    if (error) throw error;
    res.render('index', { posts: results,page_name:page_name,userId:req.session.userId ,category_title:category_title});
  });
});



router.get('/post/:id', (req, res) => {
  const postId = req.params.id;    

  
  // get all categories
  connection.query('SELECT * FROM nka_categories', (error, categories) => {
	  all_categories=categories;
    if (error) throw error;
    
  });

  
  let categoryId=1;
  
connection.query('SELECT id_category FROM nka_posts WHERE id_post = ?', [postId], (error, category_results) => {	    
    if (error) throw error;		
	categoryId = category_results[0].id_category;
    

});	


  
  // get related post by category
connection.query('SELECT * FROM nka_posts  WHERE id_category = ?',[categoryId],(error, secondresults) => {	
	 related_post=secondresults;
    if (error) throw error;   
  });
  
  
  
  connection.query('SELECT * FROM nka_posts WHERE id_post = ?', [postId], (error, results) => {
    if (error) throw error;
    res.render('post', { post: results[0], related_post:related_post, categories:all_categories,userId:req.session.userId});
  });
    
  });
  
  
  
  


module.exports = router;
