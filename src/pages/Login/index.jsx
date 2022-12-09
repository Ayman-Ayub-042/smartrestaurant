import styles from './styles.module.css';
import {Link} from 'react-router-dom'
import { NavLink , useNavigate} from "react-router-dom";

import logo from '../../img/logo.png'
import { useState } from 'react';
import "../../styles/headline1.css"
import { auth } from '../../firebase.config';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";

const Login =()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const updateEmail = (e) => setEmail(e.target.value);
    const updatePassword = (e) => setPassword(e.target.value);
    const signIn = e => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email,password)
        .then(auth => {
            console.log(auth._tokenResponse.idToken);
            localStorage.setItem("FbIdToken", auth._tokenResponse.idToken);
          
        navigate("/app");
        console.log(navigate);
      })
     
        .catch(error => alert(error.message))
    }
    return(
        <>
       
        <div className={styles.login_container} >
       
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form className={styles.form_container} >
                        <h1>Login</h1>
                        
                        <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={email}
                       
            onClick={updateEmail}
         
                        required
                        className={styles.input}
                        />
                        <input
                        type='text'
                        placeholder='Password'
                        name='password'
                        value={password}
            onClick={updatePassword}
         
                        required
                        className={styles.input}
                        />
                        {/* {error && <div className={styles.error_msg}>{error}</div>} */}
                       <div className="login_button">
                        <button type='submit' onClick={signIn} className={styles.green_btn}>
                            Sign In
                        </button>
                        <Link to="/signup">
                        <button type='button' className={styles.white_btn}>
                            Sign up

                        </button>
                    </Link>
                    </div>
                    </form>
                    
                </div>
                <div className={styles.right}>
                <img src={logo}/>
                {/* <h1>New here?</h1>
                    <Link to="/signup">
                        <button type='button' className={styles.white_btn}>
                            Sign up

                        </button>
                    </Link> */}
                    <div className="headline" >
      <div className="center-container">
        Welcome Back
       
      </div>
      <p className="paraLine" >
      Login to continue using account
      </p>
    </div>   
                </div>

            </div>

        </div>
      
        </>
    )
};
export default Login
