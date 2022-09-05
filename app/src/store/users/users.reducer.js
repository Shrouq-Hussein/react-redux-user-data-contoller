import {UsersActionTypes} from "./users.types"
const initialState = {
    isLoading: false,
    users: [],
    errorMessage: null,
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UsersActionTypes.FETCH_USERS_START:
            console.log(UsersActionTypes.FETCH_USERS_START)
            return {
                ...state,
                isLoading: true,
            }
        case UsersActionTypes.FETCH_USERS_FAILURE:
            console.log(UsersActionTypes.FETCH_USERS_FAILURE)
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        case UsersActionTypes.FETCH_USERS_SUCCESS:
            console.log(UsersActionTypes.FETCH_USERS_SUCCESS)
            return {
                ...state,
                isLoading: false,
                users: action.payload,
            }
        case UsersActionTypes.CREATE_USER_FAILURE:
            return{
                ...state,
                isLoading:false,
                errorMessage: action.payload,

            }
        default:
            return state
    }

}
export default usersReducer