import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { MapPin, Calendar, Search, Sparkles } from "lucide-react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-light via-white to-light overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.05, 0.03, 0.05],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-primary rounded-full blur-3xl"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen gap-12 px-4 py-20 text-center">
        {/* Heading */}
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-600">
              Premium Book Now Service
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight"
          >
            Luxury cars on{" "}
            <span className="text-primary relative">
              Rent
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-2 left-0 h-3 bg-primary/20 -z-10"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Experience the thrill of driving premium vehicles at unbeatable prices
          </motion.p>
        </div>

        {/* Search Form */}
        <motion.form
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
          onSubmit={handleSearch}
          className="w-full max-w-5xl"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              {/* Pickup Location */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MapPin className="w-4 h-4 text-primary" />
                  Pickup Location
                </label>
                <div className="relative">
                  <select
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-light border-2 border-transparent focus:border-primary rounded-xl outline-none transition-all cursor-pointer appearance-none text-gray-700 font-medium"
                  >
                    <option value="">Select city</option>
                    {cityList.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {pickupLocation && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-primary font-medium"
                  >
                    ✓ {pickupLocation} selected
                  </motion.p>
                )}
              </div>

              {/* Pickup Date */}
              <div className="space-y-3">
                <label
                  htmlFor="pickup-date"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  Pick-up Date
                </label>
                <input
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  type="date"
                  id="pickup-date"
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-light border-2 border-transparent focus:border-primary rounded-xl outline-none transition-all text-gray-700 font-medium"
                  required
                />
              </div>

              {/* Return Date */}
              <div className="space-y-3">
                <label
                  htmlFor="return-date"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  Return Date
                </label>
                <input
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  type="date"
                  id="return-date"
                  min={pickupDate || new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 bg-light border-2 border-transparent focus:border-primary rounded-xl outline-none transition-all text-gray-700 font-medium"
                  required
                />
              </div>

              {/* Search Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dull text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search Cars</span>
                <span className="sm:hidden">Search</span>
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* Car Image */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <img
              src={assets.main_car}
              alt="Luxury car"
              className="max-h-80 md:max-h-96 w-auto drop-shadow-2xl"
            />
          </motion.div>
          
          {/* Shadow effect */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.2, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gray-800 rounded-full blur-2xl"
          />
        </motion.div>

        {/* Stats or Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-8 md:gap-16 text-center"
        >
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
            <p className="text-sm text-gray-600 mt-1">Premium Cars</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">50k+</p>
            <p className="text-sm text-gray-600 mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
            <p className="text-sm text-gray-600 mt-1">Support</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;