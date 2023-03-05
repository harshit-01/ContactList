import '../styles/globals.css'
import {useState,useEffect} from 'react'
import Signup from "./Signup/index.js";
import Login from "./Login/index.js";
import {useRouter} from 'next/router';
import {getCookie,hasCookie} from 'cookies-next';

export default function App({ Component, pageProps }) {
  const router  = useRouter();
  const [token,setToken] = useState(false);
  useEffect(()=>{
      if(hasCookie('token')){
        setToken(true);
      }
  },[router])
  console.log('token',token)
  if(router.route === '/Signup' || (token === false && router.route !== '/Login')) {
    return <Signup></Signup>
  }
  else if(token === false){
    return <Login></Login>
  }
  return <Component {...pageProps} />
}
