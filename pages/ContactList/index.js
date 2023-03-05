import {useState,useEffect} from 'react'
import {getCookie,hasCookie} from 'cookies-next';
import styles from '../../styles/ContactList.module.scss'
import PaginationTable from '../../components/Table.js'
import axios from 'axios';

export default function ContactList(){
    const [username,setUsername] = useState(null);
    const [deleteBtn,setDeleteBtn] = useState(false);
    const [show,setShow] = useState(false);
    const [editBtn,setEditBtn] = useState(false);
    const [userList,setUserList] = useState([]);
    useEffect(() => {
        if(hasCookie('username')){
            setUsername(getCookie('username'))
        }
    },[])
    useEffect(()=>{
        if(username){
            fetchContact(username);
        }
    },[username])
    // console.log(username)
    const fetchContact = async(name)=>{
        console.log(name)
        await axios.get(`/api/ContactList/${name}`).then((res)=>{
            console.log(res);
            setUserList(res.data.userList)
        }).catch((err)=>{
            console.log(err)
        })
    }
    console.log(userList)
    const handleClick = async(e)=>{
        e.preventDefault();
        var formEl = document.forms.clForm;
        var formData = new FormData(formEl);
        var addUsername = formData.get('username');
        var type = formData.get('type');
        var PhoneNumber = formData.get('PhoneNumber');
        if(username.length === 0 || type.length === 0 || PhoneNumber.length === 0){
            alert('Please fill all the details')
        }
        else{
            try {
                await axios.post('/api/ContactList', {
                    name:username,
                    username: addUsername,
                    workType: type,
                    phoneNumber:PhoneNumber
                }).then((response) => {
                    if (response) {
                        alert("Added Successfully")
                        fetchContact(username);
                        // console.log(response);
                    }
                    // console.log(response);
                }).catch((err) => {
                    alert("Incorrect credentials provided")
                    console.log("Incorrect credentials provided")
                })
                setShow(false);
            } 
            catch (error) {
                console.error("error",error);
            }
        }
        // console.log(username,type)
    }
    const handleDelete = async(e)=>{
        e.preventDefault();
        var formEl = document.forms.deleteForm;
        var formData = new FormData(formEl);
        var deleteUser = formData.get('username');
        if(username.length === 0){
            alert('Please fill all the details')
        }
        else{
            try {
                await axios.delete(`/api/ContactList/${username}/${deleteUser}`).then((response) => {
                    if (response) {
                        alert("Deleted Successfully")
                        setDeleteBtn(false)
                        fetchContact(username);
                        // console.log(response);
                    }
                }).catch((err) => {
                    alert("Incorrect credentials provided")
                    console.log("Incorrect credentials provided")
                })
            } 
            catch (error) {
                console.error("error",error);
            }
        }
    }

    const handleEdit = async(e)=>{
        e.preventDefault();
        var formEl = document.forms.editForm;
        var formData = new FormData(formEl);
        var editUser = formData.get('username');
        var phoneNumber = formData.get('PhoneNumber');
        if(editUser.length === 0 || phoneNumber.length !== 10){
            alert('Please fill valid details')
        }
        else{
            try {
                await axios.put(`/api/ContactList/${username}/${editUser}`,{
                    phoneNumber:phoneNumber
                }).then((response) => {
                    if (response) {
                        alert("Edit Successfully")
                        fetchContact(username);
                        // console.log(response);
                    }
                }).catch((err) => {
                    alert("Incorrect credentials provided")
                    console.log("Incorrect credentials provided")
                })
                setEditBtn(false)
            } 
            catch (error) {
                console.error("error",error);
            }
        }
    }
    const addContact = async()=>{
        setShow(!show);
    }
    const deleteContact = async()=>{
        setDeleteBtn(!deleteBtn)
    }
    const updateContact = async()=>{
        setEditBtn(!editBtn)
    }
    return(
        <div className={styles.contactListContainer}>
            <div className={styles.userInfo}>
                <p className={styles.myCl}>My Contact List</p>
                <p className={styles.username}>{username?.length !== 0 ? username : ""}</p>
            </div>
            <div className={styles.contactListBtn}>
                <div onClick={addContact}>Add</div>
                <div onClick={deleteContact}>Delete</div>
                <div onClick={updateContact}>Edit</div>
            </div>
            {show ?
            <div className={styles.form}>
                <form action="" method="post"  id="clForm">
                    <p>Add contact</p>
                    <label htmlFor="username">Username</label><br/>
                    <input id="username" name="username" type="text" placeholder="Enter username"></input>
                    <label htmlFor="type">Type</label><br/>
                    <input id="type" name="type" type="type" placeholder="Work/Home"></input>
                    <label htmlFor="PhoneNumber">Phone Number</label><br/>
                    <input id="PhoneNumber" name="PhoneNumber" type="number" placeholder="Enter Phone Number"></input>
                    <button type="submit" className={styles.loginBtn} onClick={handleClick}>Submit</button>
                </form>
            </div>
            :null}
            {deleteBtn ?
            <div className={styles.form}>
                <form action="" method="post"  id="deleteForm">
                    <p>Delete contact</p>
                    <label htmlFor="username">Username</label><br/>
                    <input id="username" name="username" type="text" placeholder="Enter username"></input>
                    <button type="submit" className={styles.loginBtn} onClick={handleDelete}>Submit</button>
                </form>
            </div>
            :null}
            {editBtn ?
            <div className={styles.form}>
                <form action="" method="post"  id="editForm">
                    <p>Edit contact</p>
                    <label htmlFor="username">Username</label><br/>
                    <input id="username" name="username" type="text" placeholder="Enter username whose contact needs to be updated"></input>
                    <label htmlFor="PhoneNumber">Phone Number</label><br/>
                    <input id="PhoneNumber" name="PhoneNumber" type="number" placeholder="Enter Phone Number"></input>
                    <button type="submit" className={styles.loginBtn} onClick={handleEdit}>Submit</button>
                </form>
            </div>
            :null}
            <div className={styles.table}>
                <PaginationTable userList = {userList}></PaginationTable>
            </div>
        </div>
    )
}