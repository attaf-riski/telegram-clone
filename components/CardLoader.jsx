const CardLoader = () => {
  return (
    <div className="w-full flex flex-col py-3 px-5 border-b rounded-xl border-[#393939] space-y-2">
      <div className="w-full h-[10px] bg-[#fff] animate-pulse"></div>
      <div className="w-[50%] h-[10px] bg-[#fff] animate-pulse"></div>
      <div className="w-[70%] h-[10px] bg-[#fff] animate-pulse"></div>
    </div>
  );
};

export default CardLoader;
