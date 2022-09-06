import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./users.css"
import { fetchUsers, createUser ,updateUser,deleteUser} from "../../store/users/users.actions"
export default function Users() {
    const dispatch = useDispatch();
    const usersList = useSelector(({ users }) => users.users);
    const isLoading = useSelector(({ users }) => users.isLoading);
    const errorMessage = useSelector(({ users }) => users.errorMessage);

    useEffect(() => {
        dispatch(fetchUsers())
        console.log(usersList)
    }, [])




    return (
        <>
            {
                errorMessage ?
                    errorMessage :
                    isLoading ?
                        <div>...Loading</div>
                        :
                        usersList.length !== 0 &&
                        <div className="usersContainer">
                              <button onClick={() => {
                                dispatch(createUser({
                                    firstName: "new",
                                    lastName: "user",
                                    email: "email@ff.com",
                                    title: "mr",
                                    picture: "",
                                }))
                            }}>add user</button>
                            {
                                usersList.map((user) =>
                                (
                                    <div key={user.id} className="userRow">
                                    <h1  onClick={() => { dispatch(updateUser(user.id, {firstName:"Sarsoooooor",})) }} >
                                       firstName:  { user.firstName} | lastName: {user.lastName} | title: {user.title}
                                    </h1>
                                    <h1 onClick={()=>{dispatch(deleteUser(user.id))}} className="delete">delete</h1>
                                    </div>
                                    

                                )
                                )
                            }
                          
                        </div>
            }
        </>
    )
}