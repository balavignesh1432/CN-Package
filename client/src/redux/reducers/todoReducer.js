const todoReducer = (state=[],action)=>{
    switch(action.type){
        case "GET_TODO": return action.payload;
        case "PUT_TODO": return [...state,action.payload];
        default: return state;
    }
};

export {todoReducer};