import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Car, LayoutDashboard, LogIn, LogOut } from "lucide-react";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
    useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all ${
        location.pathname === "/" 
          ? "bg-light/80 border-borderColor" 
          : "bg-white/80 border-borderColor"
      }`}
    >
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center space-x-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-primary p-2 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary">
                bookNow
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                <motion.div
                  className="px-4 py-2 rounded-lg text-gray-600 hover:text-primary hover:bg-light transition-all font-medium"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="flex items-center bg-white border border-borderColor rounded-lg overflow-hidden shadow-sm"
                  >
                    <input
                      type="text"
                      placeholder="Search cars..."
                      className="px-3 py-2 w-full outline-none text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="px-3 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-gray-600 hover:text-primary hover:bg-light rounded-lg transition-all"
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Owner/Dashboard Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (isOwner ? navigate("/owner") : changeRole())}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary hover:bg-light rounded-lg transition-all font-medium"
            >
              {isOwner ? (
                <>
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </>
              ) : (
                <>
                  <Car className="w-4 h-4" />
                  <span>List cars</span>
                </>
              )}
            </motion.button>

            {/* Login/Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
              className="flex items-center space-x-2 px-5 py-2.5 bg-primary hover:bg-primary-dull text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-light rounded-lg transition-all"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden border-t border-borderColor overflow-hidden ${
              location.pathname === "/" 
                ? "bg-light" 
                : "bg-white"
            }`}
          >
            <div className="px-6 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="flex items-center bg-white border border-borderColor rounded-lg overflow-hidden shadow-sm">
                <Search className="w-5 h-5 ml-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cars..."
                  className="px-3 py-2.5 w-full outline-none text-sm"
                />
              </div>

              {/* Mobile Links */}
              <div className="space-y-2">
                {menuLinks.map((link, index) => (
                  <Link key={index} to={link.path}>
                    <motion.div
                      className="block px-4 py-3 rounded-lg text-gray-600 hover:text-primary hover:bg-light transition-all font-medium"
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-borderColor space-y-3">
                <button
                  onClick={() => (isOwner ? navigate("/owner") : changeRole())}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-600 hover:text-primary bg-white hover:bg-light rounded-lg transition-all font-medium border border-borderColor"
                >
                  {isOwner ? (
                    <>
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </>
                  ) : (
                    <>
                      <Car className="w-5 h-5" />
                      <span>List cars</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    user ? logout() : setShowLogin(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary hover:bg-primary-dull text-white rounded-lg shadow-md font-medium"
                >
                  {user ? (
                    <>
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Login</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;