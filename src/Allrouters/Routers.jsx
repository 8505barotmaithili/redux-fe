import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Product from "../Pages/Product";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import About from "../Pages/About";
import Privatroute from "../Components/Privatroute";
import Addproduct from "../Pages/Addproduct";
import Productdetail from "../Components/Productdetail";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addproduct" element={<Addproduct />}></Route>
        <Route path="/about" element={<About />}></Route>

        <Route path="/product" element={<Product />} />

        <Route
          path="/product/:id"
          element={
            <Privatroute>
              <Productdetail />
            </Privatroute>
          }
        />

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
};

export default Routers;
