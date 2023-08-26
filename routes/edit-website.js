// routes/edit-website.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); 

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the update-post route
router.use(authMiddleware);

// GET route to render the update post form
router.get('/edit-website/:id_tenant', (req, res) => {
  const tenantId = req.params.id_tenant;  
    connection.query('SELECT * FROM nka_tenants WHERE id_tenant= ?', [tenantId], (error, results) => {
      if (error) throw error;
      res.render('edit-website', {tenant:results[0], userId: req.session.userId });
    });	
 
});




// POST route to update a post
router.post('/edit-website/:id_tenant', (req, res) => {
  const tenantId = req.params.id_tenant;
  const { tenant_name} = req.body;
  
  //const userId= req.session.userId;
  
  const query = 'UPDATE nka_tenants SET name = ?  WHERE id_tenant = ?';

  connection.query(query, [tenant_name,tenantId], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/settings');
  });
});

module.exports = router;




