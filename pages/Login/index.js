import styles from "../../styles/Login.module.scss";
import { setCookie,getCookie,hasCookie} from 'cookies-next';
import axios from 'axios'
import {useRouter} from 'next/router';


export default function Login(){
    const router  = useRouter();
    const handleClick = async(e)=>{
        e.preventDefault();
        var formEl = document.forms.signupForm;
        var formData = new FormData(formEl);
        var username = formData.get('username');
        var password = formData.get('password');
        if(username.length === 0 || password.length === 0){
            alert('Please fill all the details')
        }
        else{
            try {
                await axios.post('/api/Login', {
                    username: username,
                    password: password,
                }).then((response) => {
                    if (typeof window !== "undefined" && response.data.token && response.status == 201) {
                        setCookie('token', response.data.token, {maxAge: 31556926}); 
                        router.push('/ContactList');
                    }
                    // console.log(response);
                }).catch((err) => {
                    alert("Incorrect credentials provided")
                    console.log("Incorrect credentials provided")
                })
            } 
            catch (error) {
                console.error("error",error);
            }
        }
        // console.log(username,password)
    }
    return (
        <div className={styles.container}>
            <div className={styles.col1}>
                <p>Welcome Back!</p>
            </div>
            <div className={styles.col2}>
                <p className={styles.loginText}>Login</p>
                <p>Please fill in the details to login.</p>
                <form action="" method="post"  id="signupForm">
                    <label htmlFor="username">Username</label><br/>
                    <input id="username" name="username" type="text" placeholder="Enter username"></input>
                    <label htmlFor="password">Password</label><br/>
                    <input id="password" name="password" type="password" placeholder="Enter password"></input>
                    <button type="submit" className={styles.loginBtn} onClick={handleClick}>Login</button>
                </form>
            </div>
        </div>
    )
}