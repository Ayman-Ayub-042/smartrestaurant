import React, {useState} from 'react'
import "../styles/Login.css"
import "../styles/headline.css"
import "../styles/inputField.css"
import { motion } from "framer-motion";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";

import Loader from "../components/Loader";
import { app } from "../firebase.config";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { NavLink , useNavigate} from "react-router-dom";
import img1 from '../img/logo.png'
import { FaFile,FaTextWidth,FaLaptopCode } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { GoEllipsis } from "react-icons/go";
import { IoIosEyeOff } from "react-icons/io";
import { storage } from "../firebase.config";
import {saveUser,getAllUser } from "../utils/firebaseFunctions";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { auth } from '../firebase.config';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import InputField from '../components/InputField';
function Signup() {
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [{ foodCategory }, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
   
    const [password, setPassword] = useState('');
   
    const uploadImage = (e) => {
      setIsLoading(true);
      const imageFile = e.target.files[0];
      const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploadProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
          setFields(true);
          setMsg("Error while uploading : Try AGain 🙇");
          setAlertStatus("danger");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset(downloadURL);
            setIsLoading(false);
            setFields(true);
            setMsg("Image uploaded successfully 😊");
            setAlertStatus("success");
            setTimeout(() => {
              setFields(false);
            }, 4000);
          });
        }
      );
    };
    const deleteImage = () => {
      setIsLoading(true);
      const deleteRef = ref(storage, imageAsset);
      deleteObject(deleteRef).then(() => {
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMsg("Image deleted successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      });
    };
    const saveDetails = () => {
      setIsLoading(true);
      try {
        if (!name ||  !imageAsset || !email || !password) {
          setFields(true);
          setMsg("Required fields can't be empty");
          setAlertStatus("danger");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        } else {
          const userdata = {
            id: `${Date.now()}`,
            name: name,
            imageURL: imageAsset,
            email:email,
            password:password,
           
          };
          saveUser(userdata);
          setIsLoading(false);
          setFields(true);
          setMsg("Data Uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
          clearData();
          navigate('/login')
        }
      } catch (error) {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      }
  
      fetchuserData();
    };
    const clearData = () => {
      setName("");
      setEmail("");
      setPassword("");
      setImageAsset(null);
     
    };
    const fetchuserData = async () => {
      await getAllUser().then((userdata) => {
   
        dispatch({
          type: actionType.SET_USER,
          user: userdata[0],
         
        });
         localStorage.setItem("user", JSON.stringify(userdata[0]));
      });
    };
   
  return (
    <div className='login'>
     {/* <div className="container">
       
        <img src={img1} alt="" className='login-logo' />
     
     </div> */}
     <div>
     <div className="headline" >
      <div className="center-container">
        Welcome Back
       
      </div>
      {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
      {/* <p className="paraLine" >
      Login to continue using account
      </p> */}
    </div>
    </div>
        <div className="login_container">
            <h1>Sign-UP</h1>
            <form >
              <div>
              <div className="group flex justify-center ml-40 items-center flex-col border-2 border-solid  w-44 h-40 cursor-pointer rounded-lg border-[#ea580c]">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-40 flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700 color-[#ea580c]" />
                      <p className="text-gray-500 hover:text-gray-700">
                    Upload your image
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>  
              {/* <InputField
            icon={FaFile}
            name="image"
            type="file"
         
            placeholder="Select image"
            value={imageAsset}
            changeHandler={uploadImage}
            
          /> */}
          
          
          
               <InputField
            icon={FaTextWidth}
            name="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            changeHandler={e => setName(e.target.value)}
          />
                <InputField
            icon={FaEnvelope}
            name="email"
            type="email"
            placeholder="Enter you email"
            value={email}
            changeHandler={e => setEmail(e.target.value)}
          />
                
                
                <InputField
            icon={GoEllipsis}
            icon2={IoIosEyeOff}
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            changeHandler={e => setPassword(e.target.value)}
           
          />
                
                </div>
                <button type='submit'  onClick={saveDetails} className='login_signinButton'>Create Account</button>
                <Link to="/login">
            <button type='submit' className='login_registerButton'>Go To SignIn Page</button>
</Link>
            </form>
           
        </div>
    </div>
  )
}

export default Signup
