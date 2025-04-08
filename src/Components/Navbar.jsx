import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../redux/actionType";

const Navbar = () => {
  const { currentuser } = useSelector((state) => state.auth);
  console.log(currentuser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div>
      <ul
        style={{
          display: "flex",
          backgroundColor: "black",
          listStyle: "none",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/product"
            style={{ color: "white", textDecoration: "none" }}
          >
            product
          </Link>
        </li>
        <li>
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </Link>
        </li>
        <li>
          {" "}
          {/* If currentuser is null or undefined, accessing currentuser.role will throw an error.
            Fix: Add an optional chaining (?.) operator. */}
          {currentuser?.role === "admin" && (
            <Link
              to="/addproduct"
              style={{ color: "white", textDecoration: "none" }}
            >
              add Products
            </Link>
          )}
        </li>
        <li>
          {" "}
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/Signup" style={{ color: "white", textDecoration: "none" }}>
            Signup
          </Link>
        </li>
        <li>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            <button onClick={handleLogout}>Logout</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
