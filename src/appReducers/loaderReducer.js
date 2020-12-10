import update from "immutability-helper";
import {  loaderAction} from "../constant/appActionConstant/loaderAction";
const initialState = {
    loading:false
};
const loaderReducer = (state=initialState,action) =>{
    let newState = state
    switch(action.type){
        case loaderAction.SHOW_LOADER :
        newState = update(state,{
            loading:{$set:true}
        })
        break
        case loaderAction.HIDE_LOADER :
        newState = update(state,{
            loading:{$set:false}
        })
        break
        default:
        newState = state

    }
    return newState
}
export default loaderReducer