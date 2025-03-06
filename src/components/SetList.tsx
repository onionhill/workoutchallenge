type Props = { sets: number[] };

const SetList = ({ sets }: Props) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg">Sets Completed:</h3>
      <ul className="list-disc list-inside">
        {sets.map((set, index) => (
          <li key={index}>Set {index + 1}: {set} reps</li>
        ))}
      </ul>
    </div>
  );
};

export default SetList;
