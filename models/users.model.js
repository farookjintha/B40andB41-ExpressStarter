const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Users', userSchema);

// Mongoose Function for CRUD
//To add a data -> Users.save();
// To read data -> Users.find();
// To update a data -> User.findByIdAndUpdate();
// To delete a data -> User.deleteOne();