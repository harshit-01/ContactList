import '../styles/globals.css'
import Signup from "./Signup/index.js";
import Login from "./Login/index.js";
import {useRouter} from 'next/router';
import {getCookie,hasCookie} from 'cookies-next';

export default function App({ Component, pageProps }) {
  const router  = useRouter();
  let x = 0;
  if(hasCookie('token')){
    x = 1;
  }
  if(router.route === '/Login'){
    x = 2;
  }
  if(router.route === '/Signup' || x == 0){
    return <Signup></Signup>
  }
  else if(x === 2){
    return <Login></Login>
  }

  return <Component {...pageProps} />
}
