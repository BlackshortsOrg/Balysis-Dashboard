import SecurityCard from "./SecurityCard";

const SecurityCards = ({ metrics }) => {
  return (
    <div className="flex flex-row items-center justify-around mt-8">
      {
        Object.entries(metrics).map(([key, val]) => {
          return <SecurityCard header={key} data={val} />
        })
      }
    </div>
  );
};

export default SecurityCards;
