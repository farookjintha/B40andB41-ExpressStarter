const mongoose = require('mongoose');

const localMongoURL = 'mongodb://localhost:27017/DemoUsersDB';
const db = async () => {
    try{
        await mongoose.connect(localMongoURL);
        console.log('DB connection established.')
    }catch(error){
        console.log('Error while conneting DB: ', error);
    }
}

module.exports = db;