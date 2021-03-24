const waitUserReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_WAITUSER": return action.payload;
        case "SET_WAITUSER": return action.payload;
        case "DEL_WAITUSER": return state.filter(user=>user!==action.payload);
        default: return state;
    }
}

export {waitUserReducer} ;