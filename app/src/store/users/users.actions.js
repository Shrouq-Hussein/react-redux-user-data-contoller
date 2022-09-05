import {UsersActionTypes} from "./users.types"
import {fetchUsersService ,createUserService} from "./users.services"

export const fetchUsersStart = () =>{
   return {
    type: UsersActionTypes.FETCH_USERS_START,
    }
}

export const fetchUsersSuccess = (usersList) =>(
    {
        type:UsersActionTypes.FETCH_USERS_SUCCESS,
        payload: usersList,
    }
)

export const fetchUsersFailure = (errorMsg) =>(
    {
        type:UsersActionTypes.FETCH_USERS_FAILURE,
        payload:errorMsg,
    }
)
export const createUserFailure = (errorMsg) =>(
    {
        type:UsersActionTypes.CREATE_USER_FAILURE,
        payload:errorMsg,
    }
)

///////////////////////////////
export const fetchUsers = () => async (dispatch)=>{
    dispatch(fetchUsersStart())
    try {
        const response = await fetchUsersService()
        console.log("response : ", response.data.data)
        dispatch(fetchUsersSuccess(response.data.data))
    }
    catch(err){
        dispatch(fetchUsersFailure(err.message))
    }
}
/////////////
export const createUser = (user) => async(dispatch) =>{
    try{
        const response = await createUserService(user)
    }
    catch(err){
        dispatch(createUserFailure(err.message)) ////////////
 
    }
}



