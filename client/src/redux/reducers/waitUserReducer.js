const waitUserReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_WAITUSER": return action.payload;
        case "SET_WAITUSER": return [...state,action.payload];
        default: return state;
    }
}

export {waitUserReducer} ;