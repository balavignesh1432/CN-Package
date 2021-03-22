import axios from 'axios'
const url="http://localhost:5000";

//Fetching Todo Items
const getTodo = () => async (dispatch,getState) =>{
    try{
        const room =getState().roomReducer;
        const {data} = await axios.post(url+"/lists/get",{room:room,type:"todo"});
        dispatch({type:"GET_TODO",payload:data});
    }catch(err){
        console.log(err.message);
    }
};

//Adding New Todo Item
const putTodo = (item) => async (dispatch,getState) =>{
    try{
        const todoItems=getState().todoReducer;
        const room =getState().roomReducer;
        let flag=0; 
        for(let i=0;i<todoItems.length;i++){
            if(todoItems[i].name===item.name){
                flag=1;
            }
        }
        if(flag!==1){
            dispatch({type:"PUT_TODO",payload:item});
            await axios.post(url+"/lists/todo",{type:"todo",items:[...todoItems,item],room:room});
        }else{
            alert("Already Exists");
        }
    }catch(err){
        console.log(err.message);
    }
};

//Edit Todo
const editTodo = (oldItem,newItem) => async (dispatch,getState) =>{
    try{
        const room =getState().roomReducer;
        dispatch({type:"EDIT_TODO",payload:{oldItem,newItem}});
        const todoItems=getState().todoReducer;
        await axios.post(url+"/lists/todo",{type:"todo",items:todoItems,room:room});
    }catch(err){
        console.log(err.message);
    }
}

//Delete Todo Item
const deleteTodo = (item) => async (dispatch,getState) =>{
    try{
        const room =getState().roomReducer;
        dispatch({type:"DEL_TODO",payload:item});
        const todoItems=getState().todoReducer;
        await axios.post(url+"/lists/todo",{items:todoItems,room:room,type:"todo"});
    }catch(err){
        console.log(err.message);
    }
}

 

//Move Todo Item 
const moveTodo = (item) =>async (dispatch,getState) =>{
    try{
        dispatch(deleteTodo(item));
        dispatch(putDoing(item));
    }catch(err){
        console.log(err.message);
    }
}

//Fetching Doing Items
const getDoing = () => async (dispatch,getState) =>{
    try{
        const room =getState().roomReducer;
        const {data} = await axios.post(url+"/lists/get",{room:room,type:"doing"});
        dispatch({type:"GET_DOING",payload:data});
    }catch(err){
        console.log(err.message);
    }
};

//Adding Doing Item
const putDoing = (item) => async (dispatch,getState) =>{
    try{
        const doingItems=getState().doingReducer;
        const room =getState().roomReducer;
        let flag=0; 
        for(let i=0;i<doingItems.length;i++){
            if(doingItems[i].name===item.name){
                flag=1;
            }
        }
        if(flag!==1){
            dispatch({type:"PUT_DOING",payload:item});
            await axios.post(url+"/lists/doing",{type:"doing",items:[...doingItems,item],room:room});        
        }else{
            alert("Already Exists");
        }
    }catch(err){
        console.log(err.message);
    }
};

const editDoing = (oldItem,newItem) => async (dispatch,getState) =>{
    try{
        const room = getState().roomReducer;
        dispatch({type:"EDIT_DOING",payload:{oldItem,newItem}});
        const doingItems=getState().doingReducer;
        await axios.post(url+"/lists/doing",{type:"doing",items:doingItems,room:room});
    }catch(err){
        console.log(err.message);
    }
} 

//Move Doing Item
const moveDoing = (item) =>async (dispatch) =>{
    try{
        dispatch(deleteDoing(item));
        dispatch(putDone(item));
    }catch(err){
        console.log(err.message);
    }
}

//Delete Doing Item
const deleteDoing = (item) => async (dispatch,getState) =>{
    try{
        const room = getState().roomReducer;
        dispatch({type:"DEL_DOING",payload:item});
        const doingItems=getState().doingReducer;
        await axios.post(url+"/lists/doing",{items:doingItems,room:room,type:"doing"});
    }catch(err){
        console.log(err.message);
    }
}

//Fetching Done Item
const getDone = () => async (dispatch,getState) =>{
    try{
        const room= getState().roomReducer;
        const {data} = await axios.post(url+"/lists/get",{room:room,type:"done"});
        dispatch({type:"GET_DONE",payload:data});
    }catch(err){
        console.log(err.message);
    }
};

//Adding Done Item
const putDone = (item) => async (dispatch,getState) =>{
    try{
        const doneItems=getState().doneReducer;
        const room =getState().roomReducer;
        let flag=0; 
        for(let i=0;i<doneItems.length;i++){
            if(doneItems[i].name===item.name){
                flag=1;
            }
        }
        if(flag!==1){
            dispatch({type:"PUT_DONE",payload:item});
            await axios.post(url+"/lists/done",{type:"done",items:[...doneItems,item],room:room});        
        }else{
            alert("Already Exists");
        }
    }catch(err){
        console.log(err.message);
    }
};

//Edit Done
const editDone = (oldItem,newItem) => async (dispatch,getState) =>{
    try{
        const room = getState().roomReducer;
        dispatch({type:"EDIT_DONE",payload:{oldItem,newItem}});
        const doneItems=getState().doneReducer;
        await axios.post(url+"/lists/done",{type:"done",items:doneItems,room:room});
    }catch(err){
        console.log(err.message);
    }
}

//Delete Done Item
const deleteDone= (item) =>async (dispatch,getState) =>{
    try{
        const room= getState().roomReducer;
        dispatch({type:"DEL_DONE",payload:item});
        const doneItems=getState().doneReducer;
        await axios.post(url+"/lists/done",{items:doneItems,room:room,type:"done"});
    }catch(err){
        console.log(err.message);
    }
}

//Set User Details
const putUser = (user) => async (dispatch) =>{
    try{
        await axios.post(url+"/user",user);
        dispatch({type:"PUT_USER",payload:user});
    }catch(err){
        console.log(err.message);
    }
}

const getUser = () => async (dispatch) =>{
    try{
        const {data} = await axios.get(url+"/user");
        dispatch({type:"GET_USER",payload:data});
    }catch(err){
        console.log(err.message);
    }
}

const getroomUser = (user) => async (dispatch)=>{
    try{   
        const {data} = await axios.get(url+"/room",user);
        dispatch({type:"GET_ROOMUSER",payload:data});
    }catch(err){
        console.log(err.message);
    }
}
const setroomUser = (user) => async (dispatch)=>{
    try{   
        await axios.post(url+"/room",user);
    }catch(err){
        console.log(err.message);
    }
}
const getwaitUser = (user) => async (dispatch)=>{
    try{   
        const {data} = await axios.get(url+"/wait",user);
        dispatch({type:"GET_WAITUSER",payload:data});
    }catch(err){
        console.log(err.message);
    }
}
const setwaitUser = (user) => async (dispatch)=>{
    try{   
        await axios.post(url+"/wait",user);
    }catch(err){
        console.log(err.message);
    }
}



export {getTodo,putTodo,deleteTodo,editTodo,moveTodo,getDoing,putDoing,editDoing,deleteDoing,moveDoing,getDone,putDone,editDone,deleteDone,putUser,getUser,getroomUser,setroomUser,getwaitUser,setwaitUser};