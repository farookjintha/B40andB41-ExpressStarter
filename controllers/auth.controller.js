const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users.model');
const Tokens = require('../models/tokens.model');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendEmail');
const { reset } = require('nodemon');

exports.register = async (req, res) => {
    try{
        const payload = req.body;
        if(!payload.password){
            return res.status(400).send({message: 'Password is mandatory!'})
        };
        const hashedValue = await bcrypt.hash(payload.password, 12); //Hashing

        payload.hashedPassword = hashedValue;
        delete payload.password;

        const newUser = new Users(payload);

        newUser.save().then(data => {
            res.status(201).send({message: 'User registration successfull.', userId: data._id});
        }).catch(error => {
            res.status(400).send({message: "Error while registering user"});
        })

    }catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
}

exports.signin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const existingUser = await Users.findOne({email: email});

        if(existingUser){
            const isValidUser = await bcrypt.compare(password, existingUser.hashedPassword);

            if(isValidUser){
                const token = await jwt.sign({_id: existingUser._id}, process.env.SECRET_KEY); //Encryption
                res.cookie('accessToken', token, {expire: new Date() + 86400000});

                return res.status(200).send({message: 'User signed-in successfully.'});
            }

            return res.status(400).send({message: 'Invalid credentials.'})
        }

        return res.status(404).send({message: "User doesn't exist."});
        
    }catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
}

exports.signout = async (req ,res) => {
    try{
        await res.clearCookie('accessToken');
        res.status(200).send({message: 'User signed-out!'});
    }catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
}

exports.forgotPassword = async (req, res) => {
    try{
        const { email } = req.body;

        if(!email){
            return res.status(400).send({message: 'Email is mandatory!'});
        }

        const user = await Users.findOne({email: email});

        if(!user){
            return res.status(400).send({message: "User doesn't exist!"});
        };

        console.log('User: ', user);

        let token = await Tokens.findOne({userId: user._id});

        if(token){
            await token.deleteOne();
        };

        let newToken = crypto.randomBytes(32).toString('hex');  //Encryption

        const hashedToken = await bcrypt.hash(newToken, 10);

        const tokenPayload = new Tokens({userId: user._id, token: hashedToken, createdAt: Date.now()})
        await tokenPayload.save();

        const link = `http://localhost:3000/reset-password?token=${newToken}&id=${user._id}`

        const isSent = await sendEmail(user.email, 'Reset Password Link', {name: user.name, link: link});

        return res.status(200).send({message: 'Email has been sent successfully.'})
    }catch(error){
        console.log('Error: ', error);
        res.status(500).send({message: "Internal Server Error"})
    }
}

exports.resetPassword = async (req, res) => {
    try{
        const {userId, token, newPassword } = req.body;

        const resetToken = await Tokens.findOne({userId: userId});

        if(!resetToken){
            return res.status(400).send({message: 'Invalid or expired token.'})
        }

        const isValid = await bcrypt.compare(token, resetToken.token);

        if(!isValid){
            return res.status(400).send({message: 'Invalid token.'})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        Users.findByIdAndUpdate({_id: userId}, {$set: {hashedPassword: hashedPassword}}).catch(error => {
            res.status(400).send({message: 'Error while updating user password.'});
        })

        await resetToken.deleteOne();

        return res.status(200).send({message: 'Reset Password is successfull.'})


    }catch(error){
        res.status(500).send({message: "Internal Server Error"})
    }
}