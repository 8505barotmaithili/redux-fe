import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";

const Addproduct = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      img: "",
      description: "",
      price: "",
      category: "",
    },
    onSubmit: (values) => {
      console.log(values);

      axios
        .post("https://redux-be.onrender.com/products", values)
        .then((res) => {
          console.log(res.data);
          toast.success("product successfully added");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <div>
      <div>add to product only admin</div>

      <form onSubmit={formik.handleSubmit}>
        <h1>Add to Product</h1>
        title name:{" "}
        <input
          type="text"
          name="title"
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        ></input>
        <br></br>
        img_url:{" "}
        <input
          type="text"
          name="img"
          id="img"
          value={formik.values.img}
          onChange={formik.handleChange}
        ></input>
        <br></br>
        description{" "}
        <input
          type="text"
          name="description"
          id="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        ></input>
        <br></br>
        price{" "}
        <input
          type="text"
          name="price"
          id="price"
          value={formik.values.price}
          onChange={formik.handleChange}
        ></input>
        <br></br>
        category:{" "}
        <select
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
        >
          <option value="">Select Category</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
        <br></br>
        <br></br>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default Addproduct;
