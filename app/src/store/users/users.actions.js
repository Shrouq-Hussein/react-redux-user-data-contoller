import { UsersActionTypes } from "./users.types"
import { fetchUsersService, createUserService, updateUserService ,deleteUserService } from "./users.services"

export const fetchUsersStart = () => {
    return {
        type: UsersActionTypes.FETCH_USERS_START,
    }
}

export const fetchUsersSuccess = (usersList) => (
    {
        type: UsersActionTypes.FETCH_USERS_SUCCESS,
        payload: usersList,
    }
)

export const fetchUsersFailure = (errorMsg) => (
    {
        type: UsersActionTypes.FETCH_USERS_FAILURE,
        payload: errorMsg,
    }
)
export const createUserStart = () => {
    return {
        type: UsersActionTypes.CREATE_USER_START,
    }
}
export const createUserSuccess = (user) => {
    return {
        type: UsersActionTypes.CREATE_USER_SUCCESS,
        payload: user,
    }
}
export const createUserFailure = (errorMsg) => (
    {
        type: UsersActionTypes.CREATE_USER_FAILURE,
        payload: errorMsg,
    }
)
export const updateUserStart = () => (
    {
        type: UsersActionTypes.UPDATE_USER_START,
    }
)
export const updateUserSuccess = (user, id) => (
    {
        type: UsersActionTypes.UPDATE_USER_SUCCESS,
        payload: {
            id,
            user,
        }
    }
)
export const updateUserFailure = (errorMsg) => (
    {
        type: UsersActionTypes.UPDATE_USER_FAILURE,
        payload: errorMsg
    }
)

export const deleteUserSuccess=(id)=>(

    {
        type:UsersActionTypes.DELETE_USER_SUCCESS,
        payload: id,
    }
)
export const deleteUserFailure =(errorMsg) =>{
    return{
        type:UsersActionTypes.DELETE_USER_FAILURE,
        payload:errorMsg
    }
}
///////////////////////////////
export const fetchUsers = () => async (dispatch) => {
    dispatch(fetchUsersStart())
    try {
        const response = await fetchUsersService()
        console.log("response : ", response.data.data)
        dispatch(fetchUsersSuccess(response.data.data))
    }
    catch (err) {
        dispatch(fetchUsersFailure(err.message))
    }
}
/////////////
export const createUser = (user) => async (dispatch) => {
    dispatch(createUserStart())
    try {
        const response = await createUserService(user)
        console.log(response.data)
        dispatch(createUserSuccess(response.data))
        dispatch(fetchUsers())

    }
    catch (err) {
        dispatch(createUserFailure(err.message)) ////////////

    }
}
/////////////////
export const updateUser = (id, newUser) => async (dispatch) => {
    dispatch(updateUserStart())
    try {
        const response = await updateUserService(id, newUser)
        console.log(response)
        dispatch(updateUserSuccess(response))

    }
    catch (err) {
        dispatch(updateUserFailure(err.message)) ////////////

    }

}
export const deleteUser = (id) => async (dispatch) => {
    try {
        const response = await deleteUserService(id)
        console.log(response)
        dispatch(fetchUsers())

    }
    catch (err) {
        dispatch(deleteUserFailure(err.message))
    }
}



