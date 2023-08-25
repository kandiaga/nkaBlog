// routes/delete-user.js

const express = require('express');
const router = express.Router();
const connection = require('../db');

const authMiddleware = require('../middleware/authMiddleware');

// Apply the authentication middleware to the delete-post route
router.use(authMiddleware);

// POST route to delete a post
router.get('/delete-user/:id_user', (req, res) => {
  const userIdCurrent = req.params.id_user;

  const query = 'DELETE FROM nka_users WHERE id_user = ?';

  connection.query(query, [userIdCurrent], (error, results) => {
    if (error) throw error;
    res.redirect('/admin/users');
  });
});

module.exports = router;
