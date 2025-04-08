import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Productdetail = () => {
  const { id } = useParams();
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get(`https://redux-be.onrender.com/products/${id}`)
      .then((res) => {
        setdata([res.data]);
      })
      .catch(() => {
        console.log("Error fetching product");
      });
  }, [id]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {data.map((ele) => {
        return (
          <div>
            <h1>{ele.title}</h1>
            <img src={ele.image} alt={ele.title} style={{ width: "300px" }} />
            <p>{ele.description}</p>
            <h3>${ele.price}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Productdetail;
