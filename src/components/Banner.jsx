import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // if you're using lucide

const Banner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-white space-y-3"
      >
        <h2 className="text-3xl font-medium">Do you Own a Luxury Car?</h2>

        <p>Monetize your vehicle effortlessly by listing it on Book Now.</p>

        <p className="max-w-130">
          We take care of insurance, driver verification and secure payments —
          so you can earn passive income, stress-free.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-primary rounded-lg font-semibold transition-all"
        >
          List Your Car
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Right Side Image */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex items-center justify-center"
      >
        <img
          src={assets.banner_car_image}
          alt="Luxury car"
          className="w-full max-w-md"
        />
      </motion.div>
    </motion.div>
  );
};

export default Banner;
