import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 my-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary to-primary-dull rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Do You Own a Luxury Car?
            </h2>
            <p className="text-lg mb-3 text-white/90">
              Monetize your vehicle effortlessly by listing it on bookNow.
            </p>
            <p className="text-white/80 mb-6">
              We take care of insurance, driver verification and secure payments - so you can earn passive income, stress-free.
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

          {/* Right Image */}
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
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;