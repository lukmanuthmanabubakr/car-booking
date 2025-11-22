import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Car, Sparkles } from "lucide-react";

const Cars = () => {
  //Getting search params from url Link
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const isSearchData = pickupLocation && pickupDate && returnDate;
  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = async () => {
    if (input === "") {
      setFilteredCars(cars);
      return null;
    }

    const filtered = cars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });

    setFilteredCars(filtered);
  };

  const searchCarAvailability = async () => {
    const { data } = await axios.post("/api/bookings/check-availability", {
      location: pickupLocation,
      pickupDate,
      returnDate,
    });
    if (data.success) {
      setFilteredCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast("No cars available");
      }
      return null;
    }
  };

  useEffect(() => {
    isSearchData && searchCarAvailability();
  }, []);

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [input, cars]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-light/20 to-white">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-light">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-col items-center py-16 px-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md mb-4"
          >
            <Car className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700">
              {filteredCars.length} Premium Vehicles Available
            </span>
          </motion.div>

          <Title
            title="Available Cars"
            subTitle="Browse our selection of premium vehicles available for your next adventure"
          />

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full max-w-2xl mt-8"
          >
            <div className="flex items-center bg-white px-6 py-4 rounded-2xl shadow-lg border-2 border-transparent focus-within:border-primary transition-all">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Search by make, model, category, or features..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 font-medium"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-all ${
                  showFilters
                    ? "bg-primary text-white"
                    : "bg-light text-gray-600 hover:bg-primary/10"
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Filter hint */}
            {input && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-6 -bottom-6 text-xs text-primary font-medium"
              >
                Searching for "{input}"...
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Cars Section */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-8 pb-4 border-b border-borderColor"
          >
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {filteredCars.length} {filteredCars.length === 1 ? "Car" : "Cars"} Found
                </p>
                <p className="text-sm text-gray-500">
                  {isSearchData
                    ? `Available in ${pickupLocation}`
                    : "Ready for your next adventure"}
                </p>
              </div>
            </div>

            {/* Sort/View options could go here */}
          </motion.div>

          {/* Cars Grid */}
          <AnimatePresence mode="wait">
            {filteredCars.length > 0 ? (
              <motion.div
                key="cars-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredCars.map((car) => (
                  <motion.div
                    key={car._id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    layout
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="w-24 h-24 bg-light rounded-full flex items-center justify-center mb-6">
                  <Car className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No Cars Found
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  {input
                    ? `No results for "${input}". Try adjusting your search.`
                    : "No vehicles available at the moment. Please check back later."}
                </p>
                {input && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInput("")}
                    className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dull transition-all"
                  >
                    Clear Search
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Cars;