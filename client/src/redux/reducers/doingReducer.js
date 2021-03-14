const doingReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_DOING": return action.payload;
        case "PUT_DOING": return [...state,action.payload];
        case "EDIT_DOING": return state.map(item=>item.name!==action.payload.oldItem.name?item:action.payload.newItem);
        case "DEL_DOING": return state.filter(item=>item.name!==action.payload.name);
        default: return state;
    }
};

export {doingReducer};