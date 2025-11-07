import React from "react";

const TestimonialCard = ({ quote, userImage, name, title }) => {
  return (
    <div className="border border-slate-200 p-6 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition duration-500">
      <p className="text-base text-slate-500">{quote}</p>
      <div className="flex items-center gap-3 mt-8">
        <img
          className="size-16 aspect-square rounded-full"
          src={userImage}
          alt={`${name} picture`}
        />
        <div>
          <h2 className="flex items-center gap-2 text-base text-gray-900 font-medium">
            {name}
          </h2>
          <p className="text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
