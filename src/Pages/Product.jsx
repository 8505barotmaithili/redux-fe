import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_DATA, GET_ERROR, GET_SUCCESS } from "../redux/actionType";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Product = () => {
  const [searchparams, setsearchparams] = useSearchParams();
  const navigate = useNavigate();
  const { loading, errors, data } = useSelector((state) => state.product);
  const { currentuser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [filter, setfilter] = useState(null);
  const [search, setSearch] = useState(null);
  const [order, setorder] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  console.log(loading, errors, data);
  console.log(searchparams);

  const getproduct = () => {
    // get the all product
    console.log(search); // Debugging log
    dispatch({ type: GET_DATA });
    axios
      .get("https://redux-be.onrender.com/products", {
        params: {
          category: filter || searchparams.getAll("category"),
          q: search,
          _sort: order ? "price" : undefined,
          _order: order,
        },
      })

      .then((res) => {
        console.log(res.data);
        toast.success("data successfully loaded");
        dispatch({ type: GET_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        console.log(err?.message);
        toast.error();
        dispatch({ type: GET_ERROR, payload: err?.message });
      });
  };
  // delete the product from local storage and db.json
  const handledelete = (id) => {
    axios

      .delete(`https://redux-be.onrender.com/products/${id}`)
      .then((res) => {
        console.log(res);
        // toast.success("Product deleted successfully");
        getproduct();
      })
      .catch((err) => {
        console.log(err?.message);
        toast.error();
      });
  };
  // update the product price

  const handleedit = (ele) => {
    setEditProduct(ele);
    setNewPrice(ele.price);
  };

  const handleUpdate = () => {
    axios
      .put(`https://redux-be.onrender.com/products/${editProduct.id}`, {
        ...editProduct,
        price: newPrice,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Product updated successfully");

        getproduct();
      })
      .catch((err) => {
        console.log(err?.message);
        toast.error("Failed ");
      });
  };

  useEffect(() => {
    const id = setTimeout(() => {
      getproduct();
    }, 800);

    return () => {
      clearTimeout(id);
    };
  }, [filter, order, search, searchparams]);

  return loading ? (
    <Loading type={"spin"} color={"black"} />
  ) : (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* filtering */}
        <div>
          <select
            style={{ height: "40px", width: "200%" }}
            value={filter}
            onChange={(e) => {
              setfilter(e.target.value);
            }}
          >
            <option value="select category">All</option>
            <option value="women's clothing">women's clothing</option>
            <option value="electronics">electronics</option>
            <option value="jewelery">jewelery</option>
            <option value="men's clothing">men's clothing</option>
          </select>
        </div>
        {/* searching */}
        <div>
          <input
            type="text"
            placeholder="Search Product..."
            style={{ height: "35px", width: "200%" }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </div>

        {/* sorting */}
        <div>
          <button type="button" onClick={() => setorder("desc")}>
            high to low
          </button>
          <button type="button" onClick={() => setorder("asc")}>
            low to high
          </button>
        </div>
      </div>
      <Sidebar />

      <br></br>
      {/* edit price */}
      <h1>Edit the price</h1>
      <div>
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <div>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.length > 0 &&
          data.map((ele) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <div
                  key={ele.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "black",
                    borderRadius: "12px",
                    padding: "20px",
                    width: "280px",
                  }}
                >
                  <img
                    src={ele.image}
                    alt={ele.name}
                    style={{
                      width: "100%",
                      height: "200px",
                    }}
                    onClick={() => navigate(`/product/${ele.id}`)}
                  />
                  <h2>{ele.title}</h2>
                  <h3>{ele.price}</h3>
                  <h3>{ele.category}</h3>

                  {currentuser?.role == "admin" && (
                    <button onClick={() => handleedit(ele)}>Edit</button>
                  )}

                  {currentuser?.role == "admin" && (
                    <button onClick={() => handledelete(ele.id)}>Delete</button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Product;
