const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    room:String,
    type:String,
    items:[{ name:String ,description:String,team:[String]}],
});

const listModel = mongoose.model('list',Schema);

module.exports = listModel; 