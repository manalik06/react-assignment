// import update from "immutability-helper"
const loginInitialState = {
    userName:"",
    password:""
}
const loginReducer = function(state,actions){
    let newState = loginInitialState
   
    switch(actions.type){
        case "UPDATE_FIELDS" :
        break
    }
    return newState
}
export default loginReducer;
