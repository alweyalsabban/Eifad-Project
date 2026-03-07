function InfoCard({ icons, number, name }) {
  return (
    <div
      className="flex flex-col w-full  h-[133.6px] p-[24.8px] pb-[0.8px] gap-5 rounded-2xl
      border-[0.8px] border-gray-200 bg-white m-auto"
    >
      <div className="flex items-center justify-between ">
        {icons}

        <h1 className="text-2xl font-bold">{number}</h1>
      </div>
      <h1 className="text-gray text-xl  ">{name}</h1>
    </div>
  );
}

export default InfoCard;
