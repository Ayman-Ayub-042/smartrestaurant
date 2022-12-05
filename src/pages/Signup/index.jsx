import styles from './styles.module.css';
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react';
import logo from '../../img/logo.png'
import "../../styles/headline1.css"




const Signup =()=>{
   
    return(
        <>  
     
        <div className={styles.signup_container}>
       
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                <img src={logo}/>
                <div className="headline" >
      <div className="center-container">
        Welcome Back
       
      </div>
      <p className="paraLine" >
      Create your account to continue using app
      </p>
    </div>  
                    
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} >
                        <h1>Create Account</h1>
                        <input
                        type='text'
                        placeholder='First Name'
                        name='firstName'
                        // onChange={handleChange}
                        // value={data.firstName}
                        required
                        className={styles.input}
                        />
                        <input
                        type='text'
                        placeholder='Last Name'
                        name='lastName'
                        // onChange={handleChange}
                        // value={data.lastName}
                        required
                        className={styles.input}
                        />
                        <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        // onChange={handleChange}
                        // value={data.email}
                        required
                        className={styles.input}
                        />
                        <input
                        type='text'
                        placeholder='Password'
                        name='password'
                        // onChange={handleChange}
                        // value={data.password}
                        required
                        className={styles.input}
                        />
                        {/* {error && <div className={styles.error_msg}>{error}</div>} */}
                        <div className="login_button">
                        <button type='submit' className={styles.green_btn}>
                            Sign Up
                        </button>
                        <Link to="/">
                        <button type='button' className={styles.white_btn}>
                            Sign in

                        </button>
                    </Link>
                    </div>
                    </form>
                </div>

            </div>

        </div>
       
        </>
    )
};
export default Signup;
