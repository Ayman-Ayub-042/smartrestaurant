import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    where,
    setDoc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { firestore } from "../firebase.config";
const Review = () => {
    const { id,category } = useParams();
    const [fooditems,setfooditems] = useState();
    // const getAllFoodItems = async () => {
    //     const items = await getDocs(
    //       query(collection(firestore, "foodItems"), where("id", "==", id))
    //     );
      
    //     setfooditems(items.docs.map((doc) => doc.data()));
    //     console.log(fooditems)
    //   };

    //   useEffect(() => {
  
    //     getAllFoodItems()
      
    //   }, []);
  return (
    <div className="w-full border-orange-500 border-2 ">
rating
    
    </div>
  )
}

export default Review