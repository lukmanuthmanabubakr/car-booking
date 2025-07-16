import React, { useState } from "react";
import { dummyUserDatayUserData } from "../../assets/assets";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const user = dummyUserData;
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    user.image = URL.createObjectURL(image);
    setImage("");
  };

  return <div></div>;
};

export default Sidebar;
