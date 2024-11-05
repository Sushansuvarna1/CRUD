import React,{useEffect, useState} from "react";
import {Link,NavLink,Routes,Router,Route } from "react-router-dom";
import Form from "./Form";
import FormDataList from "./FormDataList";
import Home from "./Home";
import Register from "./Register";
import LogIn from "./Login";
import clearUserData from "../features/list/listSlice"
import { useDispatch ,useSelector} from "react-redux";
import { getAccount } from "../features/list/validationSlice";


const NavBar=()=>{
  const [LoggedIn,setLoggedIn] = useState(false);
const dispatch=useDispatch()
  const handleAuth = () => {
    setLoggedIn(!LoggedIn);
  };
  useEffect(()=>{
    if(localStorage.getItem("token")){ 
      handleAuth()
    }
  },[])
  const data = useSelector((state) => {
    return state.app.users;
  });

return(
  <div >
    {
      LoggedIn?   
      <div className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}><h4>Home</h4></NavLink>
      <NavLink to="/form"  className={({ isActive }) => (isActive ? "active-link" : "")}><h4>Form</h4></NavLink>
      <NavLink to="/formlist"  className={({ isActive }) => (isActive ? "active-link" : "")}><h4>List</h4></NavLink>
      <NavLink to="/register"  className={({ isActive }) => (isActive ? "active-link" : "")} onClick={()=>{
      localStorage.removeItem("token")
      handleAuth()
      }} ><h4 >Logout</h4></NavLink>
      
      </div>
      :
      <div className="navbar">
      <NavLink to="/register"  className={({ isActive }) => (isActive ? "active-link" : "")}><h4>Register</h4></NavLink>
      <NavLink to="/login"  className={({ isActive }) => (isActive ? "active-link" : "")}><h4>Login</h4></NavLink>
      </div>
    }
  
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/form" element={<Form/>} />
        <Route path="/formlist" element={<FormDataList/>} />
        <Route path="/register" element={<Register  handleAuth={handleAuth}/>} />
        <Route path="/login" element={<LogIn   handleAuth={handleAuth}/>} />
      </Routes>
     
  </div>
  


)
}
export default NavBar

