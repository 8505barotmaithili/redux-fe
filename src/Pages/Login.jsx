import { current } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const { currentuser } = useSelector((state) => state.auth); //read the data from the state
  console.log(currentuser);

  const [value, setvalue] = useState(initialState);

  const { email, password } = value;
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(value);
    axios
      .get("https://redux-be.onrender.com/auth")
      .then((response) => {
        // console.log(response.data);
        const userarray = response.data;
        const currentuser = userarray.find(
          (ele) => ele.email == email && ele.password == password
        );
        console.log(currentuser);
        dispatch({ type: "LOGIN", payload: currentuser });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>this is login page</h1>
      <form onSubmit={handlesubmit}>
        <label>email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handlechange}
          required
        />
        <br />

        <label>password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlechange}
          required
        />
        <br></br>

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
