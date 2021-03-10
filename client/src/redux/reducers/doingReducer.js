const doingReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_DOING": return action.payload;
        case "PUT_DOING": return [...state,action.payload];
        default: return state;
    }
};

export {doingReducer};