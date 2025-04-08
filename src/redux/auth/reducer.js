import { LOGIN, LOGOUT, SIGNUP } from "../actionType";


 const initialState={
   users:[],
   currentuser:null,
   isauth:false,
 }
 export function reducer(state=initialState,action){
    switch(action.type){
        case SIGNUP:
            return{users:[...state.users,action.payload],currentuser:null,isauth:true};
            case LOGIN:
                return {...state,currentuser:action.payload,isauth:true};

                case LOGOUT:
                    return {...state,currentuser:null,isauth:false};
            default:
                return state


    }

   


}
export default reducer;