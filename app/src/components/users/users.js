import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {fetchUsers,createUser} from "../../store/users/users.actions"
export default function Users() {
    const dispatch = useDispatch();
    const usersList = useSelector(({ users }) => users.users);
    const isLoading = useSelector(({ users }) => users.isLoading);
    const errorMessage = useSelector(({ users }) => users.errorMessage);

    useEffect ( () =>{
       dispatch(fetchUsers())
       console.log(usersList)
    } ,[])


    return (
        <>
           {
           errorMessage ?
           errorMessage:
           isLoading ?
            <div>...Loading</div>
            :
            usersList.length !== 0 &&
            <div className="usersContainer">
                {
                   usersList.map((user) =>
                   (
                        <h1 key={user.id}>
                          {
                            user.firstName
                          }
                        </h1>
                    
                   )
                   ) 
                }
                <button onClick={()=>{ dispatch(createUser({
          firstName:"new",
          lastName:"user",
          email:"email@c.com",
          title:"mr",
          picture:"",
       }))}}>add user</button>
            </div>
           }
        </>
    )
}