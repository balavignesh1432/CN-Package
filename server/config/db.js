require('dotenv').config();
const mongoose = require('mongoose');

const ConnectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("Database Connected!");
    }
    catch(err){
        console.log("Database Connection Failed!");
        console.log(err);
    }
    
}
module.exports = ConnectDB;
    