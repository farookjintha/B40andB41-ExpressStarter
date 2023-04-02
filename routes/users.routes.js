const express = require('express');
const { users } = require('../data');

const router = express.Router();

router.get('/users', (req, res) => {
    res.send({
        message: 'Users have been retrieved.',
        users: users
    })
});

router.get('/users/:userId', (req, res) => {
    //Path Params
    //Query Params => /users/4?greetings=happyWeekend&message=goForARide
    console.log('Req.Params: ', req.params);
    console.log('Req.Query: ', req.query);

    const userId = parseInt(req.params.userId);
    const userFound = users.find(user => user.id === userId);
    res.send({
        message: "User has been retrieved.",
        user: userFound
    })
});

router.post('/users', (req, res) => {
    const newUser = req.body;
    const latestUserList = [...users, newUser];
    res.send({
        message: 'User has been added successfully.',
        users: latestUserList
    })
});

router.put('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userFound = users.find(user => user.id === userId);
    const updatedUser = {...userFound, ...req.body};
    res.send({
        message: 'User has been updated successfully.',
        user: updatedUser
    })
});

router.delete('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const updatedUserList = users.filter(user => user.id !== userId);

    res.send({
        message: 'User has been deleted successfully.',
        users: updatedUserList
    })
})

module.exports = router;