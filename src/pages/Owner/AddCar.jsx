import React, { useState } from "react";
import Title from "../../components/owner/Title";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {

  }

  return <div className="px-4 py-10 md:px-10 flex-1">
    <Title title="Add New Car" subTitle="Fill in details to list a new car for cooking, including pricing, availabilty, and car specifications" />

    <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl">

    </form>
  </div>;
};

export default AddCar;
