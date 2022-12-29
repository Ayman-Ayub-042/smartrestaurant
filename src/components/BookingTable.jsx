import React, { useEffect, useState } from 'react'
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
import { Link } from 'react-router-dom';
import { firestore } from "../firebase.config";
const BookingTable = () => {
  const [filter, setFilter] = useState("");
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [booked, setBooked] = useState("");
  const [TableValue, setTableValue]=useState()
  const [Booking, setBooking]=useState()
  const getAllTable = async () => {
    const items = await getDocs(
      query(collection(firestore, "Table"))
      // query(collection(firestore, "Table"), orderBy("id", "desc"))
    );
  
    setTableValue(items.docs.map((doc) => doc.data()));
  };

  const getTable = async () => {
    const items = await getDocs(
      query(collection(firestore, `Table`))
    );
  
    setBooking(items.docs.map((doc) => doc.data()));
    console.log(Booking,search)
   
  };
  const login1 = async (title,id) => {
    setId(id);
      setFilter(title);
  };
  console.log(booked,time,date)
  useEffect(() => {
    getAllTable()
   getTable()
  
  }, []);
  return (
    <div className='w-full h-screen bg-primary'>
      <div className=' py-5 mx-20 bg-white justify-center items-center'>
        <input type="date" placeholder='' className='my-5 mx-5 px-6 py-4 bg-primary' value={date} onChange={(e)=>setDate(e.target.value)}/>
        <input type="time" placeholder='' className='my-5 mx-5  px-10 py-4 bg-primary' value={time} onChange={(e)=>setTime(e.target.value)}/>
        {/* <button className='my-5 mx-5  px-14 py-4 bg-orange-500'>Search</button> */}
      </div>
      <div className='xl:flex xl:flex-row lg:flex lg:flex-row'>
        <div className='xl:w-1/5 sm:w-[50%] m-10 ml-20 bg-orange-100'>
        <h1 className='pl-5 text-xl pt-5'>Table</h1>
        <div className="w-full py-2 pl-10 text-lg h-full border-gray-300 ">
        
          <input
          type="radio"
          name="group1"
          value="2"
          checked={booked === "2" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
        A Section( 2 seats)
         <br />
        <input
          type="radio"
          name="group1"
          value="4"
          // checked={booked === "False" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
         B Section( 4 seats)
        <br />
        <input
          type="radio"
          name="group1"
          value="6"
          // checked={booked === "False" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
         C Section( 6 seats)
        <br />
        <input
          type="radio"
          name="group1"
          value="8"
          // checked={booked === "False" ? "checked" : ""}
          onChange={(e) => setBooked(e.target.value)}
        />{" "}
         D Section( 8 seats)
        <br />
       
        </div>
        </div>
         <div className='w-[80%] mr-20 xl:flex xl:flex-row mt-10  p-10 bg-white'>
         <div className='xl:w-[45%]  grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3.5  m-2 p-10 rounded-lg bg-primary'>
         {TableValue && TableValue?.length > 0 ? (
            TableValue.map((category) => (
              booked ? ( 
                 category.seats == booked && (
                  date && time ? (
                    category.time((timee)=>{
                     
              category.date == date && timee == time ? (
              
              <div 
              className='w-22 h-20 bg-orange-200 text-heading'  >
              
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
            ) : (
              <div
                onClick={() => {login1(category.title,category.id)}}
                className={`group ${
                  filter === category.title ? "border-black bg-orange-400 border-2 motion1" : "bg-orange-400 motion"
                } w-22  h-20  cursor-pointer text-white  drop-shadow-xl items-center justify-center  `}
              //  className='m-10 w-20 h-20 bg-orange-400 text-white'
              >
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
            )
         })
                  ):(
                    <div
                onClick={() => {login1(category.title,category.id)}}
                className={`group ${
                  filter === category.title ? "border-black bg-orange-400 border-2 motion1" : "bg-orange-400 motion"
                } w-22  h-20  cursor-pointer text-white  drop-shadow-xl items-center justify-center  `}
              //  className='m-10 w-20 h-20 bg-orange-400 text-white'
              >
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
                  )
              )):(
                date && time ? (
                category.date == date && category.time == time ? (
              
              <div 
              className='w-22 h-20 bg-orange-200 text-heading'  >
              
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
            ):(
              <div
                onClick={() => {login1(category.title,category.id)}}
                className={`group ${
                  filter === category.title ? "border-black bg-orange-400 border-2 motion1" : "bg-orange-400 motion"
                } w-22  h-20  cursor-pointer text-white  drop-shadow-xl items-center justify-center  `}
              //  className='m-10 w-20 h-20 bg-orange-400 text-white'
              >
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
            )
                ):(
                  <div
                onClick={() => {login1(category.title,category.id)}}
                className={`group ${
                  filter === category.title ? "border-black bg-orange-400 border-2 motion1" : "bg-orange-400 motion"
                } w-22  h-20  cursor-pointer text-white  drop-shadow-xl items-center justify-center  `}
              //  className='m-10 w-20 h-20 bg-orange-400 text-white'
              >
             <h1 className='text-2xl font-semibold pt-5 pl-8 items-center justify-center'>{category.title}</h1> 
             <p className='px-2'>Seats: <span>{category.seats}</span></p>
            
              </div>
                )
              )
            
             
                
              
             
            )
           
            
            )
         ):(<div></div>)}
         </div>
         <div className='xl:w-[20%] mx-5 mt-20 gap-6 flex flex-col'>
            <div className='flex flex-row gap-2'>
              <div className='w-8 h-8 bg-orange-200'></div>
              <p>Booked</p>
            </div>

            <div className='flex flex-row gap-2'>
              <div className='w-8 h-8 bg-orange-500'></div>
              <p>Vacant</p>
            </div>
         </div>



         {/* {Booking && Booking?.length > 0 ? (
            Booking.map((category) => ( */}
<div>
            {TableValue && TableValue?.length > 0 ? (
            TableValue.map((category) => (
              category.id === id && (
         <div className=' mt-10 p-5 border-headingColor border-2 gap-6 flex flex-col'>
         
         <div className='flex flex-row gap-2'>
             
              <h1>Table : </h1>
              <p className='text-xl font-semibold items-center '>{category.title}</p>
            </div>
            <div className='flex flex-row gap-2'>
             
             <h1>Date : </h1>
             <p className='text-xl font-semibold items-center '>{date}</p>
           </div>
           <div className='flex flex-row gap-2'>
             
             <h1>Time : </h1>
             <p className='text-xl font-semibold items-center '>{time}</p>
           </div>

            <div className='flex flex-row gap-2'>
             
            <h1>Advance Booking : </h1>
              <p className='text-xl font-semibold  items-center '>{category.advance}</p>
            </div>
            <div className='flex flex-row gap-2'>
             
             <h1>Total Payment : </h1>
               <p className='text-xl font-semibold  items-center '>{category.advance}</p>
             </div>
             <Link to={`/bookingtable/bookingpayment/${category.id}/${date}/${time}`}>
            <button className='my-5 mx-5  px-14 py-4 bg-orange-500'>Continue</button>
            </Link>
         </div>
            )
           )
         )
         ):(
          <div></div>
         )
         }
         </div>
         </div>
      </div>
    </div>
  )
}

export default BookingTable