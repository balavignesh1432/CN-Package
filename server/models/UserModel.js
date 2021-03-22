const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    username:String,
    password:String,
    name:String,
    email:String,
});
const userModel = mongoose.model('user',Schema);


module.exports = userModel; 