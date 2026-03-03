import React from "react";

function ActionCard({ icons, name }) {
  return (
    <div
      className="flex flex-col w-60 py-5 gap-5 rounded-2xl m-auto
      border border-gray-200 bg-white items-center hover:cursor-pointer hover:scale-105 duration-300"
    >
      <div className="flex items-center justify-between">{icons}</div>
      <h1 className="text-gray text-xl ">{name}</h1>
    </div>
  );
}

export default ActionCard;
