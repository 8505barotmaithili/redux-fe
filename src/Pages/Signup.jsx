import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP } from "../redux/actionType";

const initialState = {
  name: "",
  email: "",
  password: "",
};
function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
const Signup = () => {
  const [value, setvalue] = useState(initialState);

  const { name, email, password } = value;
  const data = useSelector((state) => state.aut); //read the data from the state

  console.log(data);

  const dispatch = useDispatch();

  const handlechange = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(value);

    // localStorage.setItem("user",JSON.stringify(value))//store value in localStorage

    axios
      .post("http://localhost:3000/auth", { ...value, role: "user" })
      .then((res) => {
        console.log(res);
        dispatch({ type: SIGNUP, payload: value });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Username"
          name="name"
          value={name}
          onChange={handlechange}
        />
        <br></br>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handlechange}
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlechange}
        />
        <br></br>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
