import React, { useContext, useState } from "react";
import "/src/Styles/Sign_Up_Page.css";
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import { UserContext } from "../Context.js";

const Sign_Up_Page = ({ set_logged_in }) => {
  const {id,setId, email,setEmail, name,setName, password,setPassword} = useContext(UserContext)
  
  const navigate = useNavigate();


  async function onSubmit(e) {
    e.preventDefault()
    // console.log("SUS")
    try {
      const res = await axios.post('http://localhost:8000/user/sign_up',{
        email,
        name,
        password
      });
      if(res.data?.errorMessage){
        alert(res.data?.errorMessage)
      }
      else{
        res.data
        setId(res.data._id)
        socket.emit("join room", res.data.user);
        navigate("/chat");
      }
    } catch (error) {
      console.log('Error registering',error)
    }
  }


  return (
    <form className="login-box">
      <div className="heading">Sign Up</div>

      <div className="sub-heading">Email</div>
      <input
        className="login-input"
        type="text"
        placeholder="Enter your email..."
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <button
        className="login-submit"
        type="submit"
        onClick={onSubmit}
      >
        Submit{" "}
      </button>
    </form>
  );
};

export default Sign_Up_Page;
