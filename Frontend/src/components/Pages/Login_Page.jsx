import React, {useContext, useState} from "react";
import "/src/Styles/Login_Page.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../Context.js";
import { socket } from "../SocketIO.jsx";

const Login_Page = ({ set_logged_in }) => {
  
  const navigate = useNavigate();
  const {id,setId, email,setEmail, name,setName, password,setPassword} = useContext(UserContext)
    
  
  async function onSubmit(e) {
    e.preventDefault()
    // console.log("SUS")
    try {
      const res = await axios.post('http://localhost:8000/user/login',{
        name,
        password
      });
      if(res.data?.errorMessage){
        alert(res.data?.errorMessage)
      }
      else{
        // console.log("HI");
        // console.log(res.data.user);
        setEmail(res.data.user.email);
        setId(res.data.user._id)
        socket.emit("join room", res.data.user);
        navigate("/chat");
      }
    } catch (error) {
      console.log('Error registering',error)
    }
  }
  return (
    <form className="login-box">
      <div className="heading">Login</div>

      <div className="sub-heading">Name</div>
      <input
        className="login-input"
        type="text"
        placeholder="Enter your username..."
        onChange={(e)=>setName(e.target.value)}
      />

      <div className="sub-heading">Password</div>
      <input
        className="login-input"
        type="text"
        placeholder="Enter your password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="login-forgot-password">Forgot Password?</div>
      <button
        className="login-submit"
        type="submit"
        onClick={onSubmit}
      >
        Submit{" "}
      </button>

      <Link to="/sign_up" className="login-sign-up">
        New user? Sign up here
      </Link>

    </form>
  );
};

export default Login_Page;
