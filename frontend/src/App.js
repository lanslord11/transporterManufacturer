import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/header/Header.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";
import Home from "./components/Home/Home.jsx";
import OrderDetails from "./components/OrderDetails/OrderDetails.jsx";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import CreateOrder from "./components/Home/CreateOrder.jsx";
import Profile from "./components/Profile/Profile.jsx";

function App() {
  const [user, setUser] = useState();

  const getAccountDetails = async () => {
    // const name = Cookies.get('token');
    // console.log(name);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const data = await axios.get("http://localhost:4000/api/me", config);
      setUser(data.data.user);
      // console.log(data.data.user);
    } catch (error) {
      // console.log(error.response.data);
    }
  };

  useEffect(() => {
    getAccountDetails();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login setUser={setUser} user={user} />}
          />
          <Route exact path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/orders/:id" element={<OrderDetails user={user} />} />
          <Route path="/newOrder" element={<CreateOrder user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route
            path="/"
            element={
              <>
                <Home user={user} />
              </>
            }
          />
        </Routes>

        {/* <Login /> */}
        {/* <Signup/> */}
      </div>
    </Router>
  );
}

export default App;
