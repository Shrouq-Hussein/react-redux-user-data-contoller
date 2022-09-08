import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {createUser,updateUser,fetchUser} from "../../store/users/users.actions"
import "./form.css"
import { useDispatch , useSelector} from "react-redux";

const UserForm = (props) => {
    const dispatch = useDispatch();
    const activeUser = useSelector(({ users }) => users.activeUser);

    // useEffect(() => {
    //     console.log("form useEffect",props)
    //     props.userid&&
    //     dispatch(fetchUser(props.userid))
    // },)
    const validate = values =>{
        const errors ={}

        if(!values.email ){
            errors.email = "Required"
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
            errors.email = 'Invalid email address';
        }
        
        if(!values.firstName ){
            errors.firstName = "Required"
        }
        else if(values.firstName.length <3 )
        {
            errors.firstName ="Must be 3 characters or more"
        }

        if(!values.lastName ){
            errors.lastName = "Required"
        }
        else if(values.lastName.length <3 )
        {
            errors.lastName ="Must be 3 characters or more"
        }

        if(!values.title ){
            errors.title = "Required"
        }
        return errors
    }
    const formik = useFormik(
        {
            initialValues: {
                firstName: "",
                lastName: "",
                title: "",
                email:"",
            }
            ,
            validate
            ,
            onSubmit:( values) => {
                console.log(values);
                props.userid?
                dispatch(updateUser(props.userid,values))
                :  
                dispatch( createUser(values));          
            }

        }
    )

    
    return (

        <Modal isOpen={props.modal} toggle={props.toggle} >
            <ModalHeader toggle={props.toggle} className="modalHeader" >
            { props.userid? "Update User" :"Add New User"}</ModalHeader>
            <ModalBody>
                <form onSubmit={formik.handleSubmit} className="userForm">
                    <label htmlFor='firstName'>First Name</label>
                    <input id="firstName" name="firstName" onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur} />
                    {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div>:null}
                    <label htmlFor='lastName'>Last Name</label>
                    <input id="lastName" name="lastName" onChange={formik.handleChange} value={formik.values.lastName} onBlur={formik.handleBlur}  />
                    {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div>:null}
                    <label htmlFor='title'>User Title</label>
                    <input id="title" name="title" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur} />
                    {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div>:null}
                    <label htmlFor='email'>Email Address</label>
                    <input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}  />
                    {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}
                    <ModalFooter>
                        <Button type="submit" color="success" >
                           { props.userid? "Update" :"Add user"}
                        </Button>{' '}
                        <Button color="secondary" onClick={props.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>

                </form>
            </ModalBody>
        </Modal>

    )
}

export default UserForm;