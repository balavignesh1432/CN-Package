const express = require('express');
const socket = require('socket.io');
var fs = require( 'fs' );

const app = express();
const httpServer=require('http').createServer(app);

const io = socket(httpServer,{
    cors:{
        origin:"*",
        methods: ["GET", "POST"]
    }
});

io.on("connection",(socket)=>{
    console.log("Socket "+socket.id+" Connected");
    
    socket.on('join',(data)=>{
        socket.join(data.room);
    });
    
    socket.on('chat',(data)=>{
        console.log(data);
        io.in(data.room).emit('update',{username:data.username,message:data.message,time:data.time});
    });
    
    socket.on("disconnect",()=>{
        console.log("Socket "+socket.id+" Disconnected");
    });
});


const port = process.env.PORT || 4000;

httpServer.listen(port,()=>{
    console.log("Server running on "+port); 
});

