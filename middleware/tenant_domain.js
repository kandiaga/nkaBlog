// tenant_domain.js


const connection = require('../db');

function fetchDomainName(req, res, next) {
	const  userId=req.session.userId;
  connection.query('SELECT t.domain,b.id_blog FROM nka_tenants AS t JOIN nka_blogs AS b ON t.id_tenant = b.id_tenant WHERE b.id_user = ?',[userId], (error, results) => {
	  
    if (error) throw error;
    if (results.length > 0) {
      req.DomainName =`${results[0].domain}/blog/${results[0].id_blog}`;
	  req.BlogId = results[0].id_blog;
    } else {
      req.DomainName = null; // Set a default value or handle this case
	  req.BlogId =null;
    }

    next();
  });
}

module.exports = { fetchDomainName };
