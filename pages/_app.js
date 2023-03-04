import '../styles/globals.css'
import Signup from "./Signup/index.js";

export default function App({ Component, pageProps }) {
  let t = 1;
  
  if(t == 1){
    return <Signup></Signup>
  }
  return <Component {...pageProps} />
}
