const loggedReducer = (state=false,action) =>{
    switch(action.type){
        case "GET_LOG": return state;
        case "SET_LOG": return true;
        default : return state;
    }
} 

export {loggedReducer};