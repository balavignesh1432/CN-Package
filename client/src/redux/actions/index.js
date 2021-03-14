import axios from 'axios'
const url="http://localhost:5000";

//Fetching Todo Items
const getTodo = () => async (dispatch) =>{
    try{
    const {data} = await axios.get(url+"/lists/todo");
    dispatch({type:"GET_TODO",payload:data});
    }catch(err){
        console.log(err.message);
    }
};

//Adding New Todo Item
const putTodo = (item) => async (dispatch,getState) =>{
    try{
        const todoItems=getState().todoReducer;
        let flag=0; 
        for(let i=0;i<todoItems.length;i++){
            if(todoItems[i].name===item.name){
                flag=1;
            }
        }
        if(flag!==1){
            dispatch({type:"PUT_TODO",payload:item});
            await axios.post(url+"/lists/todo",item);
        }else{
            alert("Already Exists");
        }
    }catch(err){
        console.log(err.message);
    }
};

//Edit Todo
const editTodo = (oldItem,newItem) => async (dispatch) =>{
    try{
        dispatch({type:"EDIT_TODO",payload:{oldItem,newItem}});
        await axios.post(url+"/lists/todo/edit",{oldItem,newItem});
    }catch(err){
        console.log(err.message);
    }
}

//Delete Todo Item
const deleteTodo = (item) => async (dispatch) =>{
    try{
        dispatch({type:"DEL_TODO",payload:item});
        await axios.post(url+"/lists/todo/delete",item);
    }catch(err){
        console.log(err.message);
    }
}

 

//Move Todo Item 
const moveTodo = (item) =>async (dispatch) =>{
    try{
        dispatch({type:"DEL_TODO",payload:item});
        dispatch(putDoing(item));
        await axios.post(url+"/lists/todo/move",item);
    }catch(err){
        console.log(err.message);
    }
}

//Fetching Doing Items
const getDoing = () => async (dispatch) =>{
    try{
        const {data} = await axios.get(url+"/lists/doing");
        dispatch({type:"GET_DOING",payload:data});
    }catch(err){
        console.log(err.message);
    }
};

//Adding Doing Item
const putDoing = (item) => async (dispatch,getState) =>{
    try{
        const doingItems=getState().doingReducer;
        let flag=0; 
        for(let i=0;i<doingItems.length;i++){
            if(doingItems[i].name===item.name){
                flag=1;
            }
        }
        if(flag!==1){
            dispatch({type:"PUT_DOING",payload:item});
            await axios.post(url+"/lists/doing",item);
        }else{
            alert("Already Exists");
        }
    }catch(err){
        console.log(err.message);
    }
};

const editDoing = (oldItem,newItem) => async (dispatch) =>{
    try{
        dispatch({type:"EDIT_DOING",payload:{oldItem,newItem}});
        await axios.post(url+"/lists/doing/edit",{oldItem,newItem});
    }catch(err){
        console.log(err.message);
    }
} 

//Move Doing Item
const moveDoing = (item) =>async (dispatch) =>{
    try{
        dispatch({type:"DEL_DOING",payload:item});
        dispatch(putDone(item));
        await axios.post(url+"/lists/doing/move",item);
    }catch(err){
        console.log(err.message);
    }
}

//Delete Doing Item
const deleteDoing = (item) => async (dispatch) =>{
    try{
        dispatch({type:"DEL_DOING",payload:item});
        await axios.post(url+"/lists/doing/delete",item);
    }catch(err){
        console.log(err.message);
    }
}

//Fetching Done Item
const getDone = () => async (dispatch) =>{
    try{
        const {data} = await axios.get(url+"/lists/done");
        dispatch({type:"GET_DONE",payload:data});
    }catch(err){
        console.log(err.message);
    }
};

//Adding Done Item
const putDone = (item) => async (dispatch,getState) =>{
    try{
        const doneItems=getState().doneReducer;
        let flag=0; 
        for(let i=0;i<doneItems.length;i++){
            if(doneItems[i].name===item.name){
                flag=1;
            }
        }
        if(flag!==1){
            dispatch({type:"PUT_DONE",payload:item});
            await axios.post(url+"/lists/done",item);
        }else{
            alert("Already Exists");
        }
    }catch(err){
        console.log(err.message);
    }
};

//Edit Done
const editDone = (oldItem,newItem) => async (dispatch) =>{
    try{
        dispatch({type:"EDIT_DONE",payload:{oldItem,newItem}});
        await axios.post(url+"/lists/done/edit",{oldItem,newItem});
    }catch(err){
        console.log(err.message);
    }
}

//Delete Done Item
const deleteDone= (item) =>async (dispatch) =>{
    try{
        dispatch({type:"DEL_DONE",payload:item});
        await axios.post(url+"/lists/done/delete",item);
    }catch(err){
        console.log(err.message);
    }
}

//Set User Details
const setUser = (user) => async (dispatch) =>{
    try{
        await axios.post(url+"/user",user);
        dispatch({type:"PUT_USER",payload:user});
    }catch(err){
        console.log(err.message);
    }
}

export {getTodo,putTodo,deleteTodo,editTodo,moveTodo,getDoing,putDoing,editDoing,deleteDoing,moveDoing,getDone,putDone,editDone,deleteDone,setUser};