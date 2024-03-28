import SingleStrategy from "./SingleStrategy";

const DeployedStrategies = (strategies) => {
  let data = Array.from(strategies["strategies"]);
  return (
    <div className="w-[38vw] h-[65vh] flex flex-col py-6 bg-white drop-shadow-md rounded-xl px-8 mt-4 ml-[54px]">
      <h1 className="text-xl font-bold">Deployed Strategies</h1>
      {strategies.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-36">
          <img src="/mascot.png" alt="mascot" />
          <h1 className="text-lg font-regular">
            You have no active Deployed Strategies!
          </h1>
        </div>
      ) : (
        <div className="pt-8">
          <SingleStrategy strategy={data} />{" "}
        </div>
      )}
    </div>
  );
};
export default DeployedStrategies;
