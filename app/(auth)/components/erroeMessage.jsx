function ErroeMessage({ errorMessage }) {
  return (
    <div className="bg-red-700 h-[5%]  w-full  mt-4 rounded-sm flex items-center pr-[2%] text-white">
      {errorMessage}
    </div>
  );
}

export default ErroeMessage;
