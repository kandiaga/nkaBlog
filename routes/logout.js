// routes/logout.js

const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login'); // Redirect the user to the login page
  });
});

module.exports = router;
