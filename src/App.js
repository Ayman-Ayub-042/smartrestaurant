import React, { useEffect } from "react";
import { Link, Route, Routes,useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer, MenuContainer,HomeContainer } from "./components";
import EditUser from "./components/EditUser";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import CreateCategory from "./components/CreateCategory";
import avatar from "./img/avatar.png"
import Login from "./pages/Login";
import Menu from "./components/Menu";
import Service from "./components/Service";
import Home from "./components/Home";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Detail from "./components/Detail";
import Index from "./components/Aboutus/Index";

import Loader from 'react-loader-bubble'
import Scanner from "./components/Scanner";
import QrCodeReader from "./components/QrCodeReader";
import CreateTable from "./components/CreateTable";
import BookingTable from "./components/BookingTable";
import Table from "./components/Table";
import TableUpdate from "./components/TableUpdate";
import BookingPayment from "./components/BookingPayment";
import Payment from "./components/Payment";
import Booking from "./components/Booking";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Multisteps from "./components/Multisteps";
import Final from "./components/multistep/steps/Final";

const App = ({loading}) => {
  const [{ foodItems }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const hotmenu =()=> {
    
    navigate("/hotmenu");
  }
  const freshmenu =()=> {
    
    navigate("/mainmenu");
  }
  const steps = [
    {
        id: '0',
        message: 'Greetings!',
 
        // This calls the next id
        // i.e. id 1 in this case
        trigger: '1',
    }, {
        id: '1',
 
        // This message appears in
        // the bot chat bubble
        message: 'Please write your username',
        trigger: '2'
    }, {
        id: '2',
 
        // Here we want the user
        // to enter input
        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: " hi {previousValue}, Please Select Item?",
        trigger: 4
    }, {
        id: '4',
        options: [
             
            // When we need to show a number of
            // options to choose we create alist
            // like this
            { value: 1, label: 'View Hot Deals',trigger:5},
            { value: 2, label: 'View Fresh Fruits',trigger:6 },
 
        ],
        // end: true
    },
    {
      id: '5',
     
      // to: '/hotmenu',
      message: hotmenu,
      trigger: 7
  },
  {
    id: '6',
   
    // to: '/hotmenu',
    message: freshmenu,
    trigger: 7
    // trigger: 7
},
{
  id: '7',
 
  // to: '/hotmenu',
  message: "Please Select ",
  trigger: 8
  // trigger: 7
},
{
  id: '8',
  options: [
       
      // When we need to show a number of
      // options to choose we create alist
      // like this
      { value: 1, label: 'View Items',trigger:3},
      { value: 2, label: 'Talk to Admin', },

  ],
  // end: true
},
];
 
// Creating our own theme
const theme = {
    background: '#ffedd5',
    headerBgColor: '#ea580c',
    headerFontSize: '20px',
    botBubbleColor: '#ea580c',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#ffa936',
    userFontColor: 'white',
};
 
// Set some properties of the bot
const config = {
    botAvatar: avatar,
    floating: true,
};
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
     
      <div className="w-screen h-auto flex flex-col ">
        <Header />

        <main className="pt-14 md:pt-20  py-4 w-full ">
          <Routes>
        
            <Route path="/*" element={<HomeContainer />} />
            <Route path="/CreateItem" element={<CreateContainer />} />
            <Route path="/createcategory" element={<CreateCategory />} />
            <Route path="/edituser" element={<EditUser/>} />
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/service" element={<Service/>}/>
            <Route path="/scanner" element={<Scanner/>}/>
            <Route path="/qrcode" element={<QrCodeReader/>}/>
            <Route path="/hotmenu" element={<MenuContainer/>} />
            <Route path="/createtable" element={<CreateTable/>} />
            <Route path="/mainmenu" element={<MainContainer/>} />
            <Route path="/aboutus" element={<Index/>} />
            <Route path="/table" element={<Table/>} />
            <Route path="/table/tableupdate/:id" element={<TableUpdate/>} />
            <Route path="/bookingtable" element={<BookingTable/>} />
            <Route path="/payment/:idd" element={<Payment/>} />
            {/* <Route path="/bookingtable/bookingpayment/:idd" element={<Booking/>} /> */}
            <Route path="/bookingtable/bookingpayment/:idd/:date/:time" element={<Multisteps/>} />
            <Route path="/detail/:category/:id" element={<Detail />} />
            <Route path="/booking" element={<Booking/>} />
            <Route path="/success/:idd/:date/:time" element={<Final/>} />
          <Route path="/cancel" element={<Cancel/>} />
          </Routes>
          <ThemeProvider theme={theme}>
                <ChatBot
 
                    // This appears as the header
                    // text for the chat bot
                    headerTitle="ChatBot"
                    steps={steps}
                    {...config}
 
                />
            </ThemeProvider>
        </main>
      </div>
    
    </AnimatePresence>
  );
};

export default App;
