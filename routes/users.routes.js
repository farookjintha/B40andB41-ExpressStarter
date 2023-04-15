const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/users.controller');
const { isAuth } = require('../utils/authentication');


const router = express.Router();

router.get('/users', isAuth, getAllUsers);
router.get('/users/:userId', isAuth, getUserById);

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

// router.put('/users/:userId', (req, res) => {
//     try{
//         Users.findByIdAndUpdate({_id: req.params.userId}, {$set: req.body}).then((data) => {
//             res.status(200).send({message: 'User has been updated successfully.', userId: data._id});
//         }).catch(error => {
//             res.status(400).send({message: 'Error while updating user.'});
//         })
//     }catch(error){
//         res.status(500).send({message: 'Internal Server Error'});
//     }
// });

// router.delete('/users/:userId', (req, res) => {
//    try{
//     Users.deleteOne({_id: req.params.userId}).then(data => {
//         res.status(200).send({message: 'User has been deleted successfully.'});
//     }).catch(error => {
//         res.status(400).send({message: 'Error while deleting user.'});
//     })
//    }catch(error){
//     res.status(500).send({message: 'Internal Server Error'});
//    }
// })

module.exports = router;