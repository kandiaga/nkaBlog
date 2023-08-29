// middleware/authMiddleware.js

module.exports = (req, res, next) => {
	
  const currentRoute = req.path;	  
  if (req.session.userId  ||  currentRoute==='/login' ||  currentRoute==='/register' ) {
    // User is logged in, proceed to the route handler
    next();
  }    
  else {
    // User is not logged in, redirect to login page
    res.redirect('/login');
  }
};
