import React from "react";

const Card = ({company,days,role,type,level,salary,location,logo}) => {
  return (
    <div className="bg-white w-[340px] rounded-2xl p-5 shadow-md">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <img
          className="w-10 h-10 rounded-full object-contain border"
          src={logo}
          alt={company}
        />

        <button className="text-sm border px-3 py-1 rounded-lg text-gray-600">
          Save
        </button>
      </div>

      {/* Company */}
      <p className="mt-6 text-gray-500 text-lg">
        {company} <span className="ml-1">{days}</span>
      </p>

      {/* Title */}
      <h2 className="text-2xl font-semibold mt-1">
        {role}
      </h2>

      {/* Tags */}
      <div className="flex gap-2 mt-3">
        <span className="bg-gray-300 px-3 py-1 rounded-full text-sm">
          {type}
        </span>
        <span className="bg-gray-300 px-3 py-1 rounded-full text-sm">
          {level}
        </span>
      </div>

      <hr className="my-10" />

      {/* Bottom */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{salary}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Card;
