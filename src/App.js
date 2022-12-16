import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer, MenuContainer,HomeContainer } from "./components";
import EditUser from "./components/EditUser";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import CreateCategory from "./components/CreateCategory";
import Login from "./pages/Login";
import Menu from "./components/Menu";
import Service from "./components/Service";
import Home from "./components/Home";


const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

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
            <Route path="/hotmenu" element={<MenuContainer/>} />
            <Route path="/mainmenu" element={<MainContainer/>} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
