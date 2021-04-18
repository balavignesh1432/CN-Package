const messageReducer = (state=[],action) =>{
    switch(action.type){
        case "SET_MESSAGE": return [...state,action.payload];
        case "RESET_MESSAGE": return [];
        default: return state;
    }
}

export {messageReducer};