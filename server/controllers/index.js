const userModel = require('../models/Usermodel');
const roomModel = require('../models/RoomModel');
const waitModel= require('../models/WaitModel')
const listModel=require('../models/ListModel');

//Fetch user details
const getUser = async (req,res)=>{
    try{
        const foundData = await userModel.find();
        if(foundData !== null){
            res.send(foundData);
            console.log("Found User Details");
        }else{
            console.log("No Data found!");
        }
    }catch(err){
        console.log(err);
    }
};

//Register User
const postUser = async (req,res)=>{
    try{
        const postData = new userModel(req.body);
        await postData.save((err)=>{
            if(!err){
                console.log("Registered Successfully!");
            }else{
                console.log("Save failed!");
            }
        });
    }catch(err){
        console.log(err);
    }
}

//Fetch room and its users
const getroomUser = async (req,res) =>{
    try{
        const foundData = await roomModel.find();
        if(foundData !== null){
            res.send(foundData);
            console.log("Found Room users");
        }else{
            res.send([]);
            console.log("No Data found!");
        }

    }catch(err){
        console.log(err.message);
    }
}

//Update room and its users
const setroomUser = async (req,res)=>{
    try{
        const room = req.body.room;
        const username = req.body.username;
        await roomModel.updateOne({room:room},{room:room,$addToSet:{users:[username]}},{upsert:true},(err)=>{
            if(!err){
                console.log("Added room user");
            }else{
                console.log("Save failed!");
            }
        });
    }catch(err){
        console.log(err);
    }
}

//Fetch waiting users
const getwaitUser = async (req,res) =>{
    try{
        const room = req.body.room;
        const foundData = await waitModel.find({room:room});
        if(foundData !== null){
            if(foundData.length!==0){
                res.send(foundData[0].users);
                console.log("Found Waiting Users");
            }else{
                res.send([]);
            }
        }else{
            res.send([]);
            console.log("No Data found!");
        }

    }catch(err){
        console.log(err.message);
    }
}

//Update waiting users
const setwaitUser = async (req,res)=>{
    try{
        const room = req.body.room;
        const username = req.body.username;
        await waitModel.updateOne({room:room},{room:room,$addToSet:{users:[username]}},{upsert:true},(err)=>{
            if(!err){
                console.log("Posted waiting user");
            }else{
                console.log("Save failed!");
            }
        });
    }catch(err){
        console.log(err);
    }
}

//Delete waiting users
const delwaitUser = async (req,res) =>{
    try{
        console.log(req.body);
        const room = req.body.room;
        const users= req.body.users;
        await waitModel.updateOne({room:room},{$set:{room:room,users:users}},(err)=>{
            if(!err){
                console.log("Deleted Waiting User");
            }else{
                console.log("Delete Failed");
            }
        });
    }catch(err){
        console.log(err.message);
    }   
}

//Fetch rooms' lists
const getList = async (req,res)=>{
    try{
        const room = req.body.room;
        const type = req.body.type;
        const foundData = await listModel.find({room:room,type:type});
        if(foundData !== null){
            if(foundData.length!==0){
                res.send(foundData[0].items);
                console.log("List Found");
            }else{
                res.send([]);
            }
        }else{
            res.send([]);
            console.log("No List found!");
        }

    }catch(err){
        res.send([]);
        console.log(err.message);
    }
}

//Post rooms' lists
const postList = async (req,res)=>{
    try{
        const room = req.body.room;
        const type = req.body.type;
        const items = req.body.items;
        await listModel.updateOne({room:room,type:type},{$set:{room:room,type:type,items:items}},{upsert:true},(err)=>{
            if(!err){
                console.log("List Posted!");
            }else{
                console.log("Save failed!");
            }
        });
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getUser,
    postUser,
    getroomUser,
    setroomUser,
    getwaitUser,
    setwaitUser,
    delwaitUser,
    getList,
    postList
};