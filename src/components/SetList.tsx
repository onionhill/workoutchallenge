import { Set } from "../types";
import {formatTime} from "../utils"

type Props = { sets: Set[] };

const SetList = ({ sets }: Props) => {
  return (
    <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-white mb-4">Sets Completed:</h3>
      <ul className="list-disc list-inside text-white space-y-2">
        {sets.map((set, index) => (
          <li
            key={index}
            className="text-lg hover:text-yellow-300 hover:bg-gray-800 p-2 rounded-md transition-colors duration-200 ease-in-out"
          >
            <span className="font-medium">Set {index + 1}:</span> {set.reps} reps 
            {set.restTime > 0 && <span className="text-sm text-gray-400"> (Rest: {formatTime(set.restTime)})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetList;
