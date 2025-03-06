import { useState } from "react";
import { Challenge } from "../types";

const exercises = ["Pushups", "Squats", "Plank"];

type Props = { onStart: (challenge: Challenge) => void };

const ChallengeForm = ({ onStart }: Props) => {
  const [type, setType] = useState("Pushups");
  const [reps, setReps] = useState(10);
  console.log('ChallengeForm')

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl mb-2">Start a new challenge</h2>
      <div className="flex flex-col space-y-4">
        <select
          className="p-2 bg-gray-700 text-white rounded w-full"
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          {exercises.map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="p-2 bg-gray-700 text-white rounded w-full"
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
        />
        <button
          className="p-2 px-4 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg transition w-full"
          onClick={() => onStart({ type, reps, sets: [] })}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ChallengeForm;
