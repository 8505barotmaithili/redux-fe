import { GET_DATA, GET_ERROR, GET_SUCCESS, LOGOUT } from "../actionType"

const initalstate={
    loading:false,
    errors:null,
    data:[]
}
export const reducer=(state=initalstate,action)=>{
    switch(action.type){
        case GET_DATA:
            return{...state, loading:true}

        case GET_SUCCESS:
            return{...state, loading:false,data:action.payload}    

        case GET_ERROR:
            return{...state, loading:false,errors:action.payload}    
 
        

        default :
        return state;
    }
  

}