const mongoose= require('mongoose');

const waitSchema = mongoose.Schema({
    room: String,
    users:[String],
});

const waitModel = mongoose.model('waituser',waitSchema);

module.exports= waitModel;