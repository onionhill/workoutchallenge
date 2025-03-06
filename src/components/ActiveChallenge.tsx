import { useState, useEffect } from "react";
import { Challenge } from "../App";
import { formatDate, getNowAsString } from "../utils";
import TimerDisplay from "./TimerDisplay";
import RepsInput from "./RepsInput";
import SetList from "./SetList";
import CompletionMessage from "./CompletionMessage";

type Props = { challenge: Challenge; onComplete: (challenge: Challenge) => void };

const ActiveChallenge = ({ challenge, onComplete }: Props) => {
  const [repsDone, setRepsDone] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [isChallengeComplete, setIsChallengeComplete] = useState(false);
  const [sets, setSets] = useState<number[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [lastSetTime, setLastSetTime] = useState<number | null>(null); // Stores timestamp of the last set
  const [restTime, setRestTime] = useState(0); // Time since last set

  const remainingReps = Math.max(challenge.reps - totalReps, 0);

  // Timer effect for elapsed time and rest time
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isChallengeComplete) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
        if (lastSetTime !== null) {
          setRestTime(Math.floor((Date.now() - lastSetTime) / 1000));
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isChallengeComplete, lastSetTime]);

  // Check if challenge is complete
  useEffect(() => {
    if (totalReps >= challenge.reps) {
      setIsChallengeComplete(true);
    }
  }, [totalReps, challenge.reps]);

  const handleRepsChange = (value: number) => setRepsDone(value);

  const handleCompleteChallenge = () => {
    if (repsDone <= 0) {
      // Optionally, show a warning or just return early if repsDone is 0 or less
      return;
    }
  
    const updatedReps = totalReps + repsDone;
    setTotalReps(updatedReps);
    setSets([...sets, repsDone]);
    setRepsDone(0);
    setLastSetTime(Date.now()); // Update last set timestamp
  
    if (updatedReps >= challenge.reps) {
      setIsChallengeComplete(true);
    }
  };

  const handleChallengeComplete = () => {
    onComplete({
      ...challenge,
      reps: totalReps,
      elapsedTime: timeElapsed,
      finishTime: getNowAsString(),
    });
  };

  return (
<div className="p-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-xl relative">
  <h2 className="text-3xl font-semibold text-white mb-2">{challenge.type} Challenge</h2>
  <p className="text-lg text-white mb-4">Target: {challenge.reps} reps</p>
  <p className="text-lg text-white mb-4">Remaining Reps: {remainingReps}</p>

  {/* Use TimerDisplay for both elapsed time and rest time */}
  <div className="flex space-x-6 mb-4">
    <TimerDisplay time={timeElapsed} label="Elapsed Time" />
    <TimerDisplay time={restTime} label="Rest Time" />
  </div>

  {!isChallengeComplete ? (
    <RepsInput
      repsDone={repsDone}
      onRepsChange={handleRepsChange}
      onCompleteSet={handleCompleteChallenge}
    />
  ) : (
    <CompletionMessage challengeType={challenge.type} onComplete={handleChallengeComplete} />
  )}

    {sets.length > 0 && (
    <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-white mb-4">Sets Completed:</h3>
        <ul className="list-disc list-inside text-white space-y-2">
        {sets.map((set, index) => (
            <li
            key={index}
            className="text-lg hover:text-yellow-300 hover:bg-gray-800 p-2 rounded-md transition-colors duration-200 ease-in-out"
            >
            <span className="font-medium">Set {index + 1}:</span> {set} reps
            </li>
        ))}
        </ul>
    </div>
    )}
</div>

  );
};

export default ActiveChallenge;
