import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import {  MdAdd } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { firestore } from "../firebase.config";
const MenuItems = ({ flag, data, scrollValue }) => {
    const rowContainer = useRef();
  const [title,settitle] = useState()
  const [id,setid]=useState()
  const [items, setItems] = useState([]);
  const [isMenu, setIsMenu] = useState(false);
  const [{ cartItems,user }, dispatch] = useStateValue();
  const deleteitem = async (id) => {
    await deleteDoc(
      doc(firestore, "foodItems",id)
    );
    console.log(id)
   console.log("deleted")
  window.location.reload(true)
    
  };
  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };
  const login1 = async (title,id) => {
    if (user && user.email === "aymanbilal042@gmail.com") {
      settitle(title)
      setid(id)
         setIsMenu(!isMenu);
       } else {
     
    }
  };
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);
  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-375 h-[475px] min-w-[475px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg  hover:border-orange-500 hover:border-2 flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full mt-8 flex items-center justify-between">
              <motion.div
                className="w-80 h-44  -mt-12 drop-shadow-xl"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-80 h-full object-contain"
                />
              </motion.div>
              {/* <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8 mr-[-30px]"
                onClick={()=> deleteitem(item?.id)}
              >
                <MdDelete className="text-white" />
              </motion.div> */}
              </div>
             
             
           

            <div className="w-full flex flex-col items-center justify-center -mt-8">
              <p className="text-textColor font-semibold text-xl md:text-xl">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <hr className="border-1 mt-2 border-gray-200 w-full h-0"/>
              <div className="flex items-center mt-9 gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-lg text-red-500">$</span> {item?.price}
                </p>
              </div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className=" rounded-full mt-4 bg-red-600 px-4 py-3 flex gap-3 items-center justify-center cursor-pointer hover:shadow-md  "
                onClick={() => setItems([...cartItems, item])}
              >
              <p className="text-lg text-white font-normal">Add to cart</p>
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          {/* <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p> */}
        </div>
      )}
      
    </div>
  )
}

export default MenuItems