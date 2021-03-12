const doneReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_DONE": return action.payload;
        case "PUT_DONE": return [...state,action.payload];
        case "DEL_DONE": return state.filter(item=>item!==action.payload);
        default: return state;
    }
};

export {doneReducer};