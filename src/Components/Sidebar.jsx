import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Sidebar = () => {
  // multilevel filtering
  const [searchparams, setsearchparams] = useSearchParams();

  const [gender, setgender] = useState(searchparams.getAll("category") || []);
  console.log(gender);

  const handlechange = (e) => {
    const { value } = e.target;

    let newarray = [...gender];

    if (gender.includes(value)) {
      newarray = gender.filter((el) => el != value);
    } else {
      newarray.push(value);
    }
    setgender(newarray);
  };
  useEffect(() => {
    setsearchparams({ category: gender });
  }, [gender]);

  return (
    <div>
      Mens
      <input
        type="checkbox"
        value={"men's clothing"}
        onChange={(e) => handlechange(e)}
        checked={gender.includes("men's clothing")}
      ></input>
      <br></br>
      woens{" "}
      <input
        type="checkbox"
        value={"women's clothing"}
        onChange={(e) => handlechange(e)}
        checked={gender.includes("women's clothing")}
      ></input>
      <br></br>
      electronics{" "}
      <input
        type="checkbox"
        value={"electronics"}
        onChange={(e) => handlechange(e)}
        checked={gender.includes("electronics")}
      ></input>
      <br></br>
      jewelery{" "}
      <input
        type="checkbox"
        value={"jewelery"}
        onChange={(e) => handlechange(e)}
        checked={gender.includes("jewelery")}
      ></input>
    </div>
  );
};

export default Sidebar;
