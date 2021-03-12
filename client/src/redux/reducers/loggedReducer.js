const loggedReducer = (state=false,action) =>{
    switch(action.type){
        case "SET_LOG": return !state;
        default : return state;
    }
} 

export {loggedReducer};