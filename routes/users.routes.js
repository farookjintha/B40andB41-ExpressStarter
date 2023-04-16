const express = require('express');
const { getAllUsers, getUserById, deleteUser, updateUser } = require('../controllers/users.controller');
const { isAuth } = require('../utils/authentication');
const { isAdmin } = require('../utils/authorization');

const router = express.Router();

router.get('/users', isAuth, isAdmin, getAllUsers);
router.get('/users/:userId', isAuth, getUserById);
router.put('/users/:userId', isAuth, updateUser);
router.delete('/users/:userId', isAuth, deleteUser);

module.exports = router;