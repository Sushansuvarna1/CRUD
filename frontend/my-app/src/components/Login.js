import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser,getUser } from "../features/list/listSlice";
import { useNavigate } from "react-router-dom";
import { getAccount, loginForm } from "../features/list/validationSlice";


const LogIn = ({handleAuth}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
   const dispatch=useDispatch()
const handleLoginSubmit=(e)=>{
    e.preventDefault()
   const formData={
       email,
       password
   }
   dispatch(loginForm(formData)).then(()=>{
    dispatch(getAccount());
   })

   if(loginForm.fulfilled){
    handleAuth()
    navigate("/")

   }
}



  return (
    <div className="form">
      <h1 className="h1">Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          className="textbox"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
        className="textbox"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button">Login</button>
      </form>
    </div>
  );
};

export default LogIn;

