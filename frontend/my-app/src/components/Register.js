import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerForm,getAccount} from "../features/list/validationSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username,
      email,
      password,
    };
    dispatch(registerForm(formData));
    if (registerForm.fulfilled) {
      setEmail("");
      setUsername("");
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <div className="form">
      <h1 className="h1">Register</h1>
      <form onSubmit={handleRegisterSubmit}>
        <input
          className="textbox"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="textbox"
          type="email"
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

        <button className="button">Register</button>
      </form>
    </div>
  );
};

export default Register;
