import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";

const Testimonals = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sunt nostrum eum alias numquam ullam neque enim delectus maiores consequuntur? Possimus recusandae exercitationem quisquam natus vitae totam, placeat atque fugiat.",
    },
    {
      name: "quisquam natu",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_2,
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sunt nostrum eum alias numquam ullam neque enim delectus maiores consequuntur? Possimus recusandae exercitationem quisquam natus vitae totam, placeat atque fugiat.",
    },
    {
      name: "consectetur adipisicing",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sunt nostrum eum alias numquam ullam neque enim delectus maiores consequuntur? Possimus recusandae exercitationem quisquam natus vitae totam, placeat atque fugiat.",
    }
  ];
  return (
    <div className="py-28 px-26 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customer Say"
        subTitle="Discover why discerning travelers choose stay Venture for thier luxury accommodations aroundthe world."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={assets.star_icon} alt="star-icon"/>
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonals;
