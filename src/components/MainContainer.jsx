import React, { useEffect, useRef, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import NotFound from "../img/NotFound.svg";
import { useQuery } from "react-query";
import { getAllCategories, saveCategory,getAllFreshCategories,saveFreshCategory } from "../utils/firebaseFunctions";
import Footer from "./Footer"
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
const MainContainer = () => {
  const [{ freshfoodItems, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  const [filter, setFilter] = useState("fruit");
  const [{foodfreshCategory}] = useStateValue();
const [freshfood,setfreshfood] = useState()
const [freshfooditems,setfreshfooditems] = useState()

const getAllFreshCategories = async () => {
  const items = await getDocs(
    query(collection(firestore, "freshfoodCategory"))
  );

  setfreshfood(items.docs.map((doc) => doc.data()));
  console.log(items)
};

const getAllfreshFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "freshfoodItems"), orderBy("id", "desc"))
  );

  setfreshfooditems(items.docs.map((doc) => doc.data()));
};

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(5);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = freshfood?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
 
  useEffect(() => {
    getAllFreshCategories()
    getAllfreshFoodItems()
  
  }, [scrollValue, cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
            Our fresh & healthy fruits
          </p>

          {/* <div className="hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div> */}
       
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
         
         
         {currentPosts && currentPosts?.length > 0 ? (
           currentPosts.map((category) => (
             <motion.div
               whileTap={{ scale: 0.75 }}
               key={category.id}
               className={`group ${
                 filter === category.title ? "bg-cartNumBg" : "bg-card"
               } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
               onClick={() => setFilter(category.title)}
             >
               <div
                 className={`w-10 h-10 rounded-full shadow-lg ${
                   filter === category.title
                     ? "bg-white"
                     : "bg-cartNumBg"
                 } group-hover:bg-white flex items-center justify-center`}
               >
                 <img
                 src={category.imageURL}
                   className={`${
                     filter === category.title
                       ? "text-textColor rounded-full"
                       : "text-white"
                   } group-hover:text-textColor w-8 h-10 rounded-full text-lg`}
                 />
               </div>
               <p
                 className={`text-sm ${
                   filter === category.title
                     ? "text-white"
                     : "text-textColor"
                 } group-hover:text-white`}
               >
                 {category.title}
               </p>
             </motion.div>
           ))): (
       <div className="w-full flex flex-col items-center justify-center">
         <img src={NotFound} className="h-340" />
         <p className="text-xl text-headingColor font-semibold my-2">
           Items Not Available
         </p>
       </div>
     )}
           {/* <RowContainer1
           flag={false}
           data={foodCategory}
         /> */}
       </div>
  <Footer className="justify-center items-center" postsPerPage={postsPerPage} totalPosts={freshfood?.length} paginate={paginate} currentPage={currentPage}/>
       <div className="w-full">
         <RowContainer
           flag={false}
           data={freshfooditems?.filter((n) => n.category == filter)}
         />
       </div>
       </div>
       
      </section>

      <MenuContainer />

      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
