import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "Renting with this platform was seamless. The booking process was simple, the car was spotless, and the support team was always available to answer my questions.",
    },
    {
      name: "James Carter",
      location: "London, UK",
      image: assets.testimonial_image_2,
      testimonial:
        "I was impressed by the variety of luxury cars available. The entire experience felt premium, and I'll definitely use this service for my next trip.",
    },
    {
      name: "Sophia Nguyen",
      location: "Sydney, Australia",
      image: assets.testimonial_image_1,
      testimonial:
        "Amazing service! The car exceeded my expectations, and everything from pickup to return was hassle-free. Highly recommend to anyone who values comfort and style.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="py-20 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Title
            title="What Our Customers Say"
            subTitle="Discover why discerning travelers choose bookNow for their luxury car rentals around the world."
          />
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl border border-borderColor shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <img
                        key={idx}
                        src={assets.star_icon}
                        alt="star"
                        className="w-5 h-5"
                      />
                    ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 leading-relaxed text-sm md:text-base break-words">
                  "{testimonial.testimonial}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-borderColor">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm md:text-base break-words">
                      {testimonial.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 break-words">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;