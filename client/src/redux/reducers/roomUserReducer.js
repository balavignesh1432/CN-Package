
const roomUserReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_ROOMUSER": return action.payload;
        case "SET_ROOMUSER": return [...state,action.payload];
        default: return state;
    }
}

export {roomUserReducer} ;