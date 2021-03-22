const userModel = require('../models/Usermodel');
const roomModel = require('../models/RoomModel');
const waitModel= require('../models/WaitModel')
const listModel=require('../models/ListModel');

const getUser = async (req,res)=>{
    try{
        const foundData = await userModel.find();
        if(foundData !== null){
            res.send(foundData);
        }else{
            console.log("No Data found!");
        }
    }catch(err){
        console.log(err);
    }
};

const postUser = async (req,res)=>{
    try{
        const postData = new userModel(req.body);
        await postData.save((err)=>{
            if(!err){
                console.log("Save Successful!");
            }else{
                console.log("Save failed!");
            }
        });
    }catch(err){
        console.log(err);
    }
}


const setroomUser = async (req,res)=>{
    try{
        const room = req.body.room;
        const username = req.body.username;
        await roomModel.updateOne({room:room},{room:room,$addToSet:{users:[username]}},{upsert:true},(err)=>{
            if(!err){
                console.log("Save Successful!");
            }else{
                console.log("Save failed!");
            }
        });
    }catch(err){
        console.log(err);
    }
}

const getroomUser = async (req,res) =>{
    try{
        const foundData = await roomModel.find();
        if(foundData !== null){
            res.send(foundData);
        }else{
            res.send([]);
            console.log("No Data found!");
        }

    }catch(err){
        console.log(err.message);
    }
}

const setwaitUser = async (req,res)=>{
    try{
        const room = req.body.room;
        const username = req.body.username;
        await waitModel.updateOne({room:room},{room:room,$addToSet:{users:[username]}},{upsert:true},(err)=>{
            if(!err){
                console.log("Save Successful!");
            }else{
                console.log("Save failed!");
            }
        });
    }catch(err){
        console.log(err);
    }
}
const getwaitUser = async (req,res) =>{
    try{
        const foundData = await waitModel.find();
        if(foundData !== null){
            res.send(foundData);
        }else{
            res.send([]);
            console.log("No Data found!");
        }

    }catch(err){
        console.log(err.message);
    }
}

const postList = async (req,res)=>{
    try{
        const room = req.body.room;
        const type = req.body.type;
        const items = req.body.items;
        await listModel.updateOne({room:room,type:type},{$set:{room:room,type:type,items:items}},{upsert:true},(err)=>{
            if(!err){
                console.log("Save Successful!");
            }else{
                console.log("Save failed!");
            }
        });
    }catch(err){
        console.log(err);
    }
}

const getList = async (req,res)=>{
    try{
        const room = req.body.room;
        const type = req.body.type;
        const foundData = await listModel.find({room:room,type:type});
        if(foundData !== null){
            res.send(foundData[0].items);
        }else{
            console.log("No Data found!");
        }

    }catch(err){
        res.send([]);
        console.log(err.message);
    }
} 

module.exports = {getUser,postUser,setroomUser,getroomUser,getwaitUser,setwaitUser,postList,getList};