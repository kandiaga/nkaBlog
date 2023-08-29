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
		
		 connection.query('SELECT * FROM nka_blogs WHERE id_tenant = ?',[tenantId,tenantDomain], (error1, blogs) => {
    if (error1) throw error1;
	
	connection.query('SELECT * FROM nka_posts', (error2, results) => {
    if (error2) throw error2;	
	  const page_name='Home';	
      post=null;
      category_title=null;
    res.render('tenant_template', {blog:blogs[0] ,websiteName,tenantDomain ,userId:req.session.userId,
	                               posts: results,page_name:page_name ,userId:req.session.userId,
								   post:post,category_title:category_title
								   }
			  );
       });
		
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





router.get('/:tenantDomain', (req, res) => {
    
   const tenantDomain = req.params.tenantDomain;
   const currentRoute = req.path;	 
   const userId=req.session.userId;
   
   
   if (tenantDomain !== 'login' && tenantDomain !== 'register')  {
 
  	
  connection.query('SELECT * FROM nka_tenants WHERE  domain = ?', [tenantDomain], (error, tenants) => {
    if (error) {
      res.send('Error fetching tenant:', error);
    } else {
		
		// verifying  data			
	     
		if (tenants.length === 0 ) {		
         //return res.status(404).send('URL not found, please verify that you entered the right link !');  	
		 const errorMessage='URL not found, please verify that you entered the right link !';
         const page_name='404 Page Not Found';		 
		 return res.status(404).render('page404',{page_name,errorMessage});
		
		
            }
       
		
		const Domain = tenants[0].domain;
		const websiteName = tenants[0].name;
		const tenantId =tenants[0].id_tenant;
		
      // Use the tenant data and blog ID to load content
      //res.send(`Welcome to ${Domain}'s blog with ID ${req.params.tenantId}`);  
	  
	  // Redirect the user to the tenant's custom domain if it exists
    if (Domain===tenantDomain) {
		
		 connection.query('SELECT * FROM nka_blogs WHERE id_tenant = ?',[tenantId], (error1, blogs) => {
    if (error1) throw error1;
	
	connection.query('SELECT * FROM nka_posts', (error2, results) => {
    if (error2) throw error2;	
	  const page_name='Home';	
      post=null;
      category_title=null;
         res.redirect(`/${Domain}/blog/${tenantId}`);
       });
		
	});	
	  //res.render('tenant_template', { Domain });
      //res.redirect(`http://127.0.0.1:3000/${Domain}`);
    } else {
      return res.status(404).send(`Tenant domain not found ${Domain}`);
    }
	
		
	  // end of  verifying 
	  
    }
	 
  
   }); // inner query
   
   
   
   }
   else{
	    const page_name=tenantDomain;
	    res.render(`${tenantDomain}`, {page_name});
  }
  
  }); //end  of  function 
  
  
  



router.get('/notfound', (req, res) => {
	const page_name='404 Page Not Found';
	  res.render('page404', {page_name});
});	


router.get('/', (req, res) => {
	const page_name='Home';
	  res.render('index', {page_name});
});	

router.get('/:tenantDomain/category/:id', (req, res) => {
  const tenantDomain = req.params.tenantDomain;	
  const categoryId= req.params.id; 
 

  connection.query('SELECT * FROM nka_categories WHERE id_category = ?',[categoryId], (errorCat, categories) => {
		if (errorCat) throw errorCat;
		if(categoryId){
		category_title=categories.category_title; 
		}
		else{
			category_title='Home';
		}
        tenantId=categories.id_tenant;
		
		const page_name=category_title; 
 
 
 connection.query('SELECT * FROM nka_blogs WHERE id_tenant = ?',[tenantId], (error1, blogs) => {
    if (error1) throw error1;
	  blog=blogs;	
	
  	   
  connection.query('SELECT * FROM nka_posts WHERE id_category = ?',[categoryId], (error, results) => {
    if (error) throw error;
    res.render('category_posts', { posts: results,page_name:page_name,userId:req.session.userId ,category_title,tenantDomain,blog});
  });
  
  });	
  
  });
  
});



router.get('/:tenantDomain/category/:idCat/post/:id', (req, res) => {
  const postId = req.params.id;    
 const tenantDomain = req.params.tenantDomain;
 const  categoryId=req.params.idCat;
  // get all categories
  connection.query('SELECT * FROM nka_categories', (error, categories) => {
	  all_categories=categories;
    if (error) throw error;
    
  });

  
  
  
connection.query('SELECT * FROM nka_categories WHERE id_category = ?', [categoryId], (error, category_results) => {	    
    if (error) throw error;		
	category_title = category_results[0].category_title;
    

});	


  
  // get related post by category
connection.query('SELECT * FROM nka_posts  WHERE id_category = ?',[categoryId],(error, secondresults) => {	
	 related_post=secondresults;
    if (error) throw error;   
  });
  
  
  
  connection.query('SELECT * FROM nka_posts WHERE id_post = ?', [postId], (error, results) => {
    if (error) throw error;
	tenantId=results[0].id_tenant;
	 
  connection.query('SELECT * FROM nka_blogs WHERE id_tenant = ?',[tenantId,tenantDomain], (error1, blogs) => {
    if (error1) throw error1;
	  blog=blogs[0];
	 
  
	
    res.render('post', { post: results[0], related_post:related_post,tenantDomain, categories:all_categories,blog,userId:req.session.userId});
  });
  
  });
    
  });
  
  
  
  


module.exports = router;
