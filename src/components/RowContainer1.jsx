import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer1 = ({ flag, data, scrollValue }) => {
  const rowContainer1 = useRef();
  const [filter, setFilter] = useState("Chicken");


  

  useEffect(() => {
    rowContainer1.current.scrollLeft += scrollValue;
  }, [scrollValue]);



  return (
    <div
      ref={rowContainer1}
      className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none"
      >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className={`group ${
                  filter === item.title ? "bg-cartNumBg" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => setFilter(item.title)}
                >
            <div className="w-full flex items-center justify-between">
              <motion.div
               className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === item.title
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className={`${
                      filter === item.title
                        ? "text-textColor rounded-full"
                        : "text-white"
                    } group-hover:text-textColor w-8 h-10 rounded-full text-lg`}
                />
              </motion.div>
             
            </div>

            <div  className={`text-sm ${
                    filter === item.title
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
              <p >
                {item?.title}
              </p>
             
              
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer1;
