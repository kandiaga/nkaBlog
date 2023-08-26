// middleware/tenant.js

function extractTenant(req, res, next) {
  const tenant = req.path.split('/')[1]; // Extract tenant from URL path
  req.tenant = tenant; // Set the tenant in the request object
  next();
}

module.exports = extractTenant;







