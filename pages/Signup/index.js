import styles from "../../styles/Signup.module.scss";
import Image from 'next/image'
import signupImage from "../../public/signup.jpg";
import axios from 'axios'
import {useRouter} from 'next/router';

export default function Signup(){
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
                await axios.post('/api/Signup', {
                    username: username,
                    password:password,
                }).then((response) => {
                    if(response.data.user){
                        router.push('/Login')
                    }
                    console.log(response.data.user);
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
                <div className={styles.imgContainer}>
                    <Image src = {signupImage} width= "400" height="250" className={styles.signupImg}>
                    </Image>
                </div>
            </div>
            <div className={styles.col2}>
                <p className={styles.signupText}>Signup</p>
                <form action="" method="post"  id="signupForm">
                    <label htmlFor="username">Username</label><br/>
                    <input id="username" name="username" type="text" placeholder="Enter username"></input>
                    <label htmlFor="password">Password</label><br/>
                    <input id="password" name="password" type="password" placeholder="Enter password"></input>
                    <button type="submit" className={styles.signupBtn} onClick={handleClick}>Signup</button>
                    <br/>
                    <br/>
                    <span>Already have an account? <span className={styles.loginText} onClick={()=>router.push('/Login')}>Login here.</span></span>
                </form>
            </div>
        </div>
    )
}