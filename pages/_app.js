import '../styles/globals.css'
import Signup from "./Signup/index.js";
import Login from "./Login/index.js";
import {useRouter} from 'next/router';

export default function App({ Component, pageProps }) {
  const router  = useRouter();
  if(router.route === '/Signup' || router.route === '/'){
    return <Signup></Signup>
  }
  else if(router.route === '/Login'){
    return <Login></Login>
  }
  return <Component {...pageProps} />
}
