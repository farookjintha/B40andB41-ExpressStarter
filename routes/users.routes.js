const express = require('express');
const { getAllUsers, getUserById, deleteUser, updateUser } = require('../controllers/users.controller');
const { isAuth } = require('../utils/authentication');
const { isAdmin } = require('../utils/authorization');



const router = express.Router();

router.get('/users', isAuth, isAdmin, getAllUsers);
router.get('/users/:userId', isAuth, getUserById);
router.put('/users/:userId', isAuth, updateUser);
router.delete('/users/:userId', isAuth, deleteUser);

// router.post('/users', (req, res) => {
//     try{
//         let newUser = new Users(req.body); //Validation
//         newUser.save().then(data => {
//             res.status(201).send({message: 'User has been added successfully.', data: data});
//         }).catch(error => {
//             res.status(400).send({message: "Error while adding user"});
//         })
//     }catch(error){
//         res.status(500).send({message: 'Internal Server Error'});
//     }
// });




module.exports = router;