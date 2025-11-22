import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, CheckCircle, XCircle, Receipt } from "lucide-react";

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-light/30 via-white to-light/30 py-16">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title
            title="My Bookings"
            subTitle="View and manage all your car bookings"
            align="left"
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          <div className="bg-white rounded-xl p-4 border border-borderColor shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-borderColor shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-borderColor shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">
              {bookings.filter((b) => b.status === "cancelled").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-borderColor shadow-sm">
            <p className="text-gray-500 text-xs mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-primary">
              {currency}
              {bookings.reduce((sum, b) => sum + b.price, 0)}
            </p>
          </div>
        </motion.div>

        {/* Bookings List */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </motion.div>
          ) : bookings.length > 0 ? (
            <motion.div
              key="bookings"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 mt-12"
            >
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-2xl border border-borderColor shadow-lg hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                    {/* Car Image */}
                    <div className="md:col-span-3">
                      <div className="relative rounded-xl overflow-hidden group">
                        <motion.img
                          src={booking.car.image}
                          alt={`${booking.car.brand} ${booking.car.model}`}
                          className="w-full h-48 md:h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="md:col-span-6 space-y-4">
                      {/* Car Info */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {booking.car.brand} {booking.car.model}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {booking.car.year} • {booking.car.category} • {booking.car.location}
                        </p>
                      </div>

                      {/* Status Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-light rounded-lg">
                          <Receipt className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">Booking #{index + 1}</span>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                            booking.status === "confirmed"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {booking.status === "confirmed" ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          <span className="text-sm font-semibold capitalize">
                            {booking.status}
                          </span>
                        </div>
                      </div>

                      {/* Rental Period */}
                      <div className="flex items-start gap-3 p-3 bg-light/50 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Rental Period</p>
                          <p className="font-semibold text-gray-800">
                            {new Date(booking.pickupDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}{" "}
                            →{" "}
                            {new Date(booking.returnDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-3 p-3 bg-light/50 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Pick-up Location</p>
                          <p className="font-semibold text-gray-800">{booking.car.location}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="md:col-span-3 flex flex-col justify-between">
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Total Price</p>
                        <div className="text-4xl font-bold text-primary mb-2">
                          {currency}
                          {booking.price}
                        </div>
                        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>
                            Booked on{" "}
                            {new Date(booking.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      {/* <div className="space-y-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dull transition-all"
                        >
                          View Details
                        </motion.button>
                        {booking.status === "confirmed" && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-4 py-2.5 border-2 border-borderColor text-gray-700 rounded-lg font-medium hover:bg-light transition-all"
                          >
                            Cancel Booking
                          </motion.button>
                        )}
                      </div> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 mt-12"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mb-6 shadow-lg"
              >
                <Receipt className="w-16 h-16 text-primary" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 mb-3">Your Bookings Are Empty</h3>
              <p className="text-gray-500 text-center max-w-md mb-2 text-lg">
                You haven't made any bookings yet.
              </p>
              <p className="text-gray-600 text-center max-w-md mb-8 font-medium">
                Start exploring our premium vehicles and book your dream car today!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/cars")}
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-dull transition-all shadow-lg hover:shadow-xl"
              >
                Book Your First Car
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyBookings;