const todoReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_TODO": return action.payload;
        case "PUT_TODO": return [...state,action.payload];
        case "EDIT_TODO": return state.map(item=>item.name!==action.payload.oldItem.name?item:action.payload.newItem);
        case "DEL_TODO": return state.filter(item=>item.name!==action.payload.name);
        default: return state;
    }
};

export {todoReducer};