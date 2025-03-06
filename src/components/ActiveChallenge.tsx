import { useState, useEffect, useCallback } from "react";
import { Challenge, Set } from "../types";
import { getNowAsString } from "../utils";
import TimerDisplay from "./TimerDisplay";
import RepsInput from "./RepsInput";
import SetList from "./SetList";

type Props = { 
  challenge: Challenge; 
  onComplete: (challenge: Challenge) => void; 
};

const ActiveChallenge = ({ challenge, onComplete }: Props) => {

  
  console.log('ActiveChallenge')
  const [repsDone, setRepsDone] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [sets, setSets] = useState<Set[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [lastSetTime, setLastSetTime] = useState<number | null>(null); // Stores timestamp of the last set
  const [restTime, setRestTime] = useState(0); // Time since last set

  const remainingReps = Math.max(challenge.reps - totalReps, 0);

  // Timer effect for elapsed time and rest time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
      if (lastSetTime !== null) {
        setRestTime(Math.floor((Date.now() - lastSetTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastSetTime]);

  const handleChallengeComplete = useCallback(
    (completed: boolean) => {
      onComplete({
        ...challenge,
        reps: totalReps,
        elapsedTime: timeElapsed,
        finishTime: getNowAsString(),
        sets, // Updated sets are passed here as well
        completed
      });
    },
    [onComplete, challenge, totalReps, timeElapsed, sets] // Dependencies for useCallback
  );

  // Update the challenge when total reps is met or exceeded
  useEffect(() => {
    if (totalReps >= challenge.reps) {
      handleChallengeComplete(true)
    }
  }, [totalReps, challenge.reps, handleChallengeComplete]);

  const handleRepsChange = (value: number) => setRepsDone(value);

  const handleCompleteSet = () => {
    if (repsDone > 0) {
      const currentTime = Date.now();
      const restTime = lastSetTime ? Math.floor((currentTime - lastSetTime) / 1000) : 0;

      setSets((prevSets) => [...prevSets, { reps: repsDone, restTime }]);
      setTotalReps(totalReps + repsDone);
      setRepsDone(0);
      setLastSetTime(currentTime);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-xl relative">
      <h2 className="text-3xl font-semibold text-white mb-2">{challenge.type} Challenge</h2>
      <button
        className="mt-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        onClick={() => handleChallengeComplete(false) }
      >
        Cancel Challenge
      </button>
      <p className="text-lg text-white mb-4">Target: {challenge.reps} reps</p>
      <p className="text-lg text-white mb-4">Remaining Reps: {remainingReps}</p>

      {/* Use TimerDisplay for both elapsed time and rest time */}
      <div className="flex space-x-6 mb-4">
        <TimerDisplay time={timeElapsed} label="Elapsed Time" />
        <TimerDisplay time={restTime} label="Rest Time" />
      </div>

      <RepsInput repsDone={repsDone} onRepsChange={handleRepsChange} onCompleteSet={handleCompleteSet} />
      {sets.length > 0 && <SetList sets={sets} />}
    </div>
  );
};

export default ActiveChallenge;
