import { Challenge } from "../App";
import { formatDate } from "../utils";

type Props = { challenges: Challenge[] };

const ChallengeHistory = ({ challenges }: Props) => {
  return (
    <div className="p-6 bg-gray-800 rounded-xl mt-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-white">Completed Challenges</h2>
      <table className="w-full mt-4 text-sm text-gray-300">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="py-2 text-left font-medium">Type</th>
            <th className="py-2 text-left font-medium">Reps</th>
            <th className="py-2 text-left font-medium">Elapsed Time</th>
            <th className="py-2 text-left font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
        {challenges.map((c, i) => {
            const hours = Math.floor(c.elapsedTime! / 3600);
            const minutes = Math.floor((c.elapsedTime! % 3600) / 60);
            const seconds = c.elapsedTime! % 60;
            
            return (
                <tr key={i} className="hover:bg-gray-700 border-b border-gray-600">
                <td className="py-2">{c.type}</td>
                <td className="py-2">{c.reps}</td>
                <td className="py-2 font-mono text-teal-400">
                    {`${hours > 0 ? `${hours}:` : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
                </td>
                <td className="py-2">{formatDate(c.finishTime)}</td>
                </tr>
            );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ChallengeHistory;
