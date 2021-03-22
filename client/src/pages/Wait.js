import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getroomUser } from "../redux/actions/index";

function Wait(){
    
    const {room}=useParams();
    const {username}=useParams();
    const history=useHistory();
    const dispatch= useDispatch();
    
    useEffect(()=>{
        dispatch(getroomUser());
    },[dispatch]);

    const roomUsers= useSelector(state=>state.roomUserReducer);
    useEffect(()=>{
        for(let i=0;i<roomUsers.length;i++){
            if(roomUsers[i].room===room && roomUsers[i].users.includes(username)){
                dispatch({type:"SET_ROOM",payload:room});
                dispatch({type:"SET_USERNAME",payload:username});
                history.push("/board/"+room+'/'+username);
            }
        }
    },[dispatch,roomUsers,room,username,history]);

    return (
        <h1>Waiting For Acceptance!</h1>
    )
}

export default Wait;