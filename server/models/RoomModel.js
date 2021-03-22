const mongoose= require('mongoose');

const roomSchema = mongoose.Schema({
    room: String,
    users:[String],
});

const roomModel = mongoose.model('roomuser',roomSchema);

module.exports=roomModel;