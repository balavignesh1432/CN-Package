const {getUser,postUser,setroomUser,getroomUser,getwaitUser,setwaitUser,postList,getList,delwaitUser}=require('../controllers/index');
const express=require('express');
const router = express.Router();

router.get("/test",(req,res)=>{
    console.log("Routing Successful");
    console.log(req.body);
});

//User Registration and Details
router.get("/user",getUser);
router.post("/user",postUser);

//Room Users
router.post("/room/get",getroomUser);
router.post("/room/post",setroomUser);

//Waiting Users
router.post("/wait/get",getwaitUser);
router.post("/wait/post",setwaitUser);
router.post("/wait/delete",delwaitUser);

//List Items
router.post("/lists/get",getList);
router.post("/lists/post",postList);
 



module.exports = router;