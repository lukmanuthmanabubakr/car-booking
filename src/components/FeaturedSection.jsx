import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      }
    },
  };

  return (
    <div className="relative py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-b from-white via-light/30 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Handpicked Selection
            </span>
          </motion.div>

          <Title
            title="Featured Vehicles"
            subTitle="Explore our selection of premium vehicles available for your next adventure"
          />
        </motion.div>

        {/* Cars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cars.slice(0, 6).map((car) => (
            <motion.div
              key={car._id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative"
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/cars");
              scrollTo(0, 0);
            }}
            className="group relative overflow-hidden px-8 py-4 bg-white border-2 border-primary text-primary hover:text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Animated background */}
            <motion.span
              className="absolute inset-0 bg-primary"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Button content */}
            <span className="relative flex items-center gap-2">
              Explore All Cars
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Stats or Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-20 text-center"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                ⚡
              </motion.span>
            </div>
            <div className="text-left">
              <p className="text-xl font-bold text-gray-800">Instant Booking</p>
              <p className="text-sm text-gray-600">Quick & Easy Process</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl"
              >
                ✓
              </motion.span>
            </div>
            <div className="text-left">
              <p className="text-xl font-bold text-gray-800">Verified Cars</p>
              <p className="text-sm text-gray-600">Quality Guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <motion.span
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl"
              >
                🛡️
              </motion.span>
            </div>
            <div className="text-left">
              <p className="text-xl font-bold text-gray-800">Safe & Secure</p>
              <p className="text-sm text-gray-600">Fully Insured</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedSection;