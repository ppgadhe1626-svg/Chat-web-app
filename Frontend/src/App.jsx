// Dependencies
import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login_Page from "./Pages/Login_Page.jsx";
import Sign_Up_Page from "./Pages/Sign_Up_Page.jsx";
import Chat_Page from "./Pages/Chat_Page.jsx"
import { useState, createContext, useContext } from "react";
import { UserContext } from "./Context.js";
// Styles
const App = () => {

  const [logged_in, set_logged_in] = useState(0);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [password,setPassword] = useState();
  
  return (
    <UserContext.Provider value= {{id,setId, email,setEmail, name,setName, password,setPassword}}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={logged_in ? <Navigate to="/chat" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login_Page set_logged_in={set_logged_in} />} />
          <Route path="/sign_up" element={<Sign_Up_Page />} />
          <Route path="/chat" element={<Chat_Page />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
