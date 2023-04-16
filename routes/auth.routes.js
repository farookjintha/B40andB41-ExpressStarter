const express = require('express');
const router = express.Router();

const { register, signin, signout, forgotPassword, resetPassword } = require('../controllers/auth.controller');

router.post('/register', register);

router.post('/signin', signin);

router.get('/signout', signout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);


module.exports = router;