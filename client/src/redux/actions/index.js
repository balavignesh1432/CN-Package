import axios from 'axios'
const url="http://localhost:5000";

//Fetching Todo Items
const getTodo = () => async (dispatch) =>{
    const {data} = await axios.get(url+"/lists/todo");
    dispatch({type:"GET_TODO",payload:data});
};

//Adding New Todo Item
const putTodo = (item) => async (dispatch) =>{
    await axios.put(url+"/lists/todo",item);
    dispatch({type:"PUT_TODO",payload:item});
};

//Fetching Doing Items
const getDoing = () => (dispatch) =>{
    const {data} = await axios.get(url+"/lists/doing");
    dispatch({type:"GET_DOING",payload:data});
};

//Adding Doing Item
const putDoing = (item) => async (dispatch) =>{
    await axios.put(url+"/lists/doing",item);
    dispatch({type:"PUT_DOING",payload:item});
};

//Fetching Done Item
const getDone = () => (dispatch) =>{
    const {data} = await axios.get(url+"/lists/done");
    dispatch({type:"GET_DONE",payload:data});
};

//Adding Done Item
const putDone = (item) => async (dispatch) =>{
    await axios.put(url+"/lists/done",item);
    dispatch({type:"PUT_DONE",payload:item});
};
export {getTodo,putTodo,getDoing,putDoing,getDone,putDone};