const {getUser,postUser,setroomUser,getroomUser,getwaitUser,setwaitUser,postList,getList}=require('../controllers/index');
const express=require('express');
const router = express.Router();

router.get("/test",(req,res)=>{
    console.log("Routing Successful");
});

router.get("/user",getUser);
router.post("/user",postUser);

router.get("/room",getroomUser);
router.post("/room",setroomUser);

router.get("/wait",getwaitUser);
router.post("/wait",setwaitUser);

router.post("/lists/get",getList);

router.post("/lists/todo",postList);
router.post("/lists/doing",postList); 
router.post("/lists/done",postList); 



module.exports = router;