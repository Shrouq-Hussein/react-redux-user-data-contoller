import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./users.css"
import { fetchUsers, createUser, updateUser, deleteUser ,fetchUser} from "../../store/users/users.actions"
import UserForm from "../form/form"
import { Button } from "reactstrap"

import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";

export default function Users() {

    const [modal, setModal] = useState(false);
    const [userId, setUserId] = useState("");
    const toggle = () => setModal(!modal);


    const dispatch = useDispatch();
    const usersList = useSelector(({ users }) => users.users);
    const isLoading = useSelector(({ users }) => users.isLoading);
    const errorMessage = useSelector(({ users }) => users.errorMessage);
    const columns = [
        { 
            title: "Pic",
            field: "picture" ,
            render: (rowData) => <img src={rowData.picture} style={{ width: 40, borderRadius: "50%" }} />,
        },
        { title: "Title", field: "title" },
        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
  
    ]
    useEffect(() => {
        dispatch(fetchUsers())
        // console.log(usersList)
    }, [])




    return (
        <div className="p-2">
            {
                errorMessage ?
                    errorMessage :
                    isLoading ?
                        <div>...Loading</div>
                        :
                        usersList.length !== 0 &&
                        <div className="usersContainer">

                            <div className="header my-3">
                                <h1>User Management</h1>
                                <Button color="success" onClick={() => { toggle(); setUserId("") }}>
                                    + Add New
                                </Button>
                            </div>
                            <UserForm modal={modal} toggle={toggle} userid={userId} />

                            <MaterialTable 
                            title="" 
                            columns={columns}
                            data={usersList}
                            icons={tableIcons} 
                            actions= {[
                                {
                                  icon: tableIcons.Delete,
                                  tooltip: "Delete User",
                                  onClick: (event, rowData) =>{ dispatch(deleteUser( rowData.id))},
                                },
                                {
                                  icon: tableIcons.Edit,
                                  tooltip: "Edit User",
                                  onClick:(event, rowData) => {  toggle() ; setUserId(rowData.id); dispatch(fetchUser(rowData.id))},
                                },
                                {
                                    icon: tableIcons.Add,
                                    tooltip: "Add User",
                                    isFreeAction: true,
                                    onClick:() => { toggle(); setUserId("") },
                                  },
                              ]}
                            />
                            {/* {
                                usersList.map((user) =>
                                (
                                    <div key={user.id} className="userRow">
                                        {/* {/* <h1 onClick={() => { dispatch(updateUser(user.id, { firstName: "Sarsoooooor", })) }} > 
                                        <h1 onClick={()=>{ toggle() ; setUserId(user.id); dispatch(fetchUser(user.id))}} >

                                            firstName:  {user.firstName} | lastName: {user.lastName} | title: {user.title}
                                        </h1>
                                        <h1 onClick={() => { dispatch(deleteUser(user.id)) }} className="delete">delete</h1>
                                    </div>


                                )
                                )
                            } */}

                        </div>
            }
        </div>
    )
}