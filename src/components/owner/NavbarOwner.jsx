import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { Car } from "lucide-react";
import { motion } from "framer-motion";


const NavbarOwner = () => {
  const { user } = useAppContext();
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <Link to="/">
        <motion.div
          className="flex items-center space-x-2 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="bg-primary p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-primary">bookNow</span>
        </motion.div>
      </Link>

      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
