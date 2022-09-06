import { UsersActionTypes } from "./users.types"
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
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,

            }
        case UsersActionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: [...state.users, action.payload]

            }
        case UsersActionTypes.CREATE_USER_START:
            return {
                ...state,
                isLoading: true,
            }
        case UsersActionTypes.UPDATE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,

            }
        case UsersActionTypes.UPDATE_USER_SUCCESS:
            let otherUsers = state.users.filter((u) => u.id !== action.payload.id)
            let oldUser = state.users.filter((u) => u.id === action.payload.id)[0]
            console.log(oldUser, otherUsers, [...otherUsers, { ...oldUser, ...action.payload.user }])
            return {
                ...state,
                isLoading: false,
                users: [...otherUsers, { id: action.payload.id }]

            }
        case UsersActionTypes.UPDATE_USER_START:
            return {
                ...state,
                isLoading: true,
            }
        case UsersActionTypes.DELETE_USER_SUCCESS:
            let updatedList = state.users.filter((u) => u.id !== action.payload.id)
            return {
                users: updatedList,
                isLoading: false,
            }
        case UsersActionTypes.DELETE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        default:
            return state
    }

}
export default usersReducer