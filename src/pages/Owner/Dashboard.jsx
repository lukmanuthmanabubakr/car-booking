import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";

const Dashboard = () => {
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
  ];

  useEffect(() => {
    setData(dummyDashboardData);
  }, []);
  return <div></div>;
};

export default Dashboard;
