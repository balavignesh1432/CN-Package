const doneReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_DONE": return action.payload;
        case "PUT_DONE": return [...state,action.payload];
        case "EDIT_DONE": return state.map(item=>item.name!==action.payload.oldItem.name?item:action.payload.newItem);
        case "DEL_DONE": return state.filter(item=>item.name!==action.payload.name);
        default: return state;
    }
};

export {doneReducer};