import apiClient from "../../apiClient";

export const fetchUsersService = ()=>{
    return apiClient.get("user?")
}

export const createUserService = (user)=>{
    return apiClient.post("user/create?",user)
}
