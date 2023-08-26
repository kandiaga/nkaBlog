const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

const extractTenant = require('./middleware/tenant');

//app.use(extractTenant);

// Middleware to handle subdomains
app.use((req, res, next) => {
  const parts = req.hostname.split('.');
  req.subdomain = parts[0]; // Extract the subdomain
  next();
});


// Set up session middleware
app.use(
  session({
    secret: 'NkaBLOGV1.0.0.0', // Replace with a random string
    resave: false,
    saveUninitialized: true,
  })
);

const routes = require('./routes'); // Make sure the path is correct
app.use('/', routes); // Apply the routes to the root route '/'

app.use(express.urlencoded({ extended: true })); 

// Serve static files from the "public" directory
app.use(express.static('public'));


const addCategoryRoute = require('./routes/add-category');
app.use(addCategoryRoute);

const editCategoryRoute = require('./routes/edit-category');
app.use(editCategoryRoute);


const deleteCategoryRoute = require('./routes/delete-category'); 
app.use(deleteCategoryRoute); 

const categoriesRoute = require('./routes/categories');
app.use(categoriesRoute); 

const addPostRoute = require('./routes/add-post'); 
app.use(addPostRoute); 

const updatePostRoute = require('./routes/update-post'); 
app.use(updatePostRoute); 

const deletePostRoute = require('./routes/delete-post'); 
app.use(deletePostRoute); 


const adminPostsRoute = require('./routes/admin-posts'); 
app.use(adminPostsRoute);

const adminCategoriesRoute = require('./routes/admin-categories'); 
app.use(adminCategoriesRoute);

const adminUsersRoute = require('./routes/admin-users'); 
app.use(adminUsersRoute);

const addUserRoute = require('./routes/add-user');
app.use(addUserRoute);

const editUserRoute = require('./routes/edit-user');
app.use(editUserRoute);

const deleteUserRoute = require('./routes/delete-user');
app.use(deleteUserRoute);


const adminHomeRoute = require('./routes/admin-home');
app.use(adminHomeRoute);

const adminBlogSettingsRoute = require('./routes/admin-blog');
app.use(adminBlogSettingsRoute);

const adminWebsiteSettingsRoute = require('./routes/admin-settings');
app.use(adminWebsiteSettingsRoute);


const editBlogInfoRoute = require('./routes/edit-bloginfo');
app.use(editBlogInfoRoute);

const editWebsiteInfoRoute = require('./routes/edit-website');
app.use(editWebsiteInfoRoute);


const authRoute = require('./routes/auth'); // Add this line
app.use(authRoute);

const logoutRouter = require('./routes/logout');
app.use(logoutRouter);


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
