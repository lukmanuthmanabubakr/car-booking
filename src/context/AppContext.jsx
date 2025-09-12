import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [cars, setCars] = useState([]);

  // Fuction to check if user is logged in
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Fuction to fetch all cars from the server
  const fetchCars = async () => {
    try {
      await axios
    } catch (error) {
      
    }
  }

  //Use effect to retrieve the token from localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  //Use effect to fetch user data when token is available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }
  }, [token]);

  const value = {
    navigate,
    currency,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
