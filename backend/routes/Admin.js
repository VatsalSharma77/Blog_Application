const express = require('express');
const { getAllUsers, updateUserRole, getAllPosts } = require('../controllers/adminController');
const auth = require('../middleware/authMiddlewware');
const admin = require('../middleware/admin');
const router = express.Router();

router.get('/users', auth, admin, getAllUsers);
router.put('/users/:id', auth, admin, updateUserRole);
router.get('/posts', auth, admin, getAllPosts);

module.exports = router;
