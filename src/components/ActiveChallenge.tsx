import { useState, useEffect } from "react";
import { Challenge, Set } from "../types";
import { getNowAsString } from "../utils";
import TimerDisplay from "./TimerDisplay";
import RepsInput from "./RepsInput";
import CompletionMessage from "./CompletionMessage";
import SetList from "./SetList";
import { HiTrophy, HiXCircle  } from "react-icons/hi2";
type Props = { challenge: Challenge; onComplete: (challenge: Challenge) => void };

const ActiveChallenge = ({ challenge, onComplete }: Props) => {
  const [repsDone, setRepsDone] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [isChallengeComplete, setIsChallengeComplete] = useState(false);
  const [sets, setSets] = useState<Set[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [lastSetTime, setLastSetTime] = useState<number | null>(null); // Stores timestamp of the last set
  const [restTime, setRestTime] = useState(0); // Time since last set
  const [isChallengeCancelled, setIsChallengeCancelled] = useState(false);
  const [cancelMessage, setCancelMessage] = useState("");

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
    if (repsDone > 0) {
      const currentTime = Date.now();
      const restTime = lastSetTime ? Math.floor((currentTime - lastSetTime) / 1000) : 0;
  
      setSets([...sets, { reps: repsDone, restTime }]);
      setTotalReps(totalReps + repsDone);
      setRepsDone(0);
      setLastSetTime(currentTime);
  
      if (totalReps + repsDone >= challenge.reps) {
        setIsChallengeComplete(true);
      }
    }
  };


  const handleCancelChallenge = () => {
    const completionPercentage = (totalReps / challenge.reps) * 100;
    let message = "";

    if (completionPercentage < 20) {
      message = "That was a tough one. Better luck next time!";
    } else if (completionPercentage < 50) {
      message = "Nice try! Keep pushing!";
    } else if (completionPercentage < 80) {
      message = "Almost there! You got this!";
    } else {
      message = "So close! Next time you'll crush it!";
    }

    setIsChallengeCancelled(true);
    setCancelMessage(message);   
  };

  const handleChallengeComplete = (completed: boolean) => {
    onComplete({
      ...challenge,
      reps: totalReps,
      elapsedTime: timeElapsed,
      finishTime: getNowAsString(),
      sets,
      completed
    });
  };

  return (
  <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg shadow-xl relative">
    <h2 className="text-3xl font-semibold text-white mb-2">{challenge.type} Challenge</h2>
    {!isChallengeComplete && !isChallengeCancelled && (<button 
      className="mt-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
      onClick={handleCancelChallenge}
    >
      Cancel Challenge
    </button>)}
    <p className="text-lg text-white mb-4">Target: {challenge.reps} reps</p>
    <p className="text-lg text-white mb-4">Remaining Reps: {remainingReps}</p>
  
    {/* Use TimerDisplay for both elapsed time and rest time */}
    <div className="flex space-x-6 mb-4">
      <TimerDisplay time={timeElapsed} label="Elapsed Time" />
      <TimerDisplay time={restTime} label="Rest Time" />
    </div>

    {isChallengeCancelled ? (
      <CompletionMessage
      icon={<HiXCircle />}
      message={cancelMessage}
      buttonText="Leave Challenge"
      onButtonClick={() => handleChallengeComplete(false) } 
      bgColor="bg-red-600"
      buttonColor="bg-red-700 hover:bg-red-800"
    />
  ) : !isChallengeComplete ? (
    <RepsInput
      repsDone={repsDone}
      onRepsChange={handleRepsChange}
      onCompleteSet={handleCompleteChallenge}
    />
  ) : (
    <CompletionMessage  
    icon={<HiTrophy />}
    message={`Congratulations! You've completed the ${challenge.type} challenge!`}
    buttonText="Complete Challenge"
    onButtonClick={() => handleChallengeComplete(true) } />
  )}



    {sets.length > 0 && <SetList sets={sets} />}
  </div>

  );
};

export default ActiveChallenge;
