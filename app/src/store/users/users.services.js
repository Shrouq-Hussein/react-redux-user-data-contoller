import apiClient from "../../apiClient";

export const fetchUsersService = ()=>{
    return apiClient.get("user?")
}

export const createUserService = (user)=>{
    return apiClient.post("user/create?",user)
}

export const updateUserService =(id,user) =>{
    return apiClient.put(`user/${id}`,user)
}

export const deleteUserService = (id)=>{
    return apiClient.delete(`user/${id}`)
}
