const express = require('express');
const router = express.Router();
const connection = require('./db.js');



router.get('/:tenantDomain/blog/:tenantId', (req, res) => {
  const tenantDomain = req.params.tenantDomain;
  const tenantId = req.params.tenantId;	
  connection.query('SELECT * FROM nka_tenants WHERE id_tenant = ?  AND  domain = ?', [tenantId,tenantDomain], (error, tenants) => {
    if (error) {
      res.send('Error fetching tenant:', error);
    } else {
		
		// verifying  data			
	     if (tenants.length === 0) {
          return res.status(404).send('URL not found, please  verify  that you entered the right link !');
        }		
		
		const Domain = tenants[0].domain;
		const websiteName = tenants[0].name;
		
      // Use the tenant data and blog ID to load content
      //res.send(`Welcome to ${Domain}'s blog with ID ${req.params.tenantId}`);  
	  
	  // Redirect the user to the tenant's custom domain if it exists
    if (Domain===tenantDomain) {
		
		 connection.query('SELECT * FROM nka_blogs WHERE id_tenant = ?',[tenantId,tenantDomain], (error, blogs) => {
    if (error) throw error;
    res.render('tenant_template', {blog:blogs[0] ,websiteName,tenantDomain ,userId:req.session.userId});
       });
		
		
	  //res.render('tenant_template', { Domain });
      //res.redirect(`http://127.0.0.1:3000/${Domain}`);
    } else {
      return res.status(404).send(`Tenant domain not found ${Domain}`);
    }
	  
	  
	  // end of  verifying 
	  
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
