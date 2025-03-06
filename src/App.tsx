import { useEffect, useState } from "react";
import ChallengeForm from "./components/ChallengeForm";
import ActiveChallenge from "./components/ActiveChallenge";
import ChallengeHistory from "./components/ChallengeHistory";
import CONFIG from "../config";
import image from "./logo.jpeg";

export type Challenge = {
  type: string;
  reps: number;
  elapsedTime?: number; 
  sets: number[],
  finishTime?: string;
  completed?: boolean;
}


function App() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    fetch(`${CONFIG.API_URL}/challenges`)
      .then((res) => res.json())
      .then(setChallenges);
  }, []);

  const startChallenge = (challenge: Challenge) => {
    setActiveChallenge(challenge);
  };

  const completeChallenge = (completed: Challenge) => {
    setChallenges([...challenges, completed]);
    setActiveChallenge(null);
    console.log('running the file save??');
    fetch(`${CONFIG.API_URL}/challenges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completed),
    });
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex items-center align-left mb-6">
          <img
            src={image}
            width={100}
            className="max-h-12 max-w-12 mr-2" // Set maximum height and width for the image
            alt="Workout Challenge Logo"
          />
          <h1 className="text-3xl">Workout Challenge</h1>
        </div>
        {!activeChallenge ? (
          <ChallengeForm onStart={startChallenge} />
        ) : (
          <ActiveChallenge challenge={activeChallenge} onComplete={completeChallenge} />
        )}
        {challenges.length > 0 && !activeChallenge && <ChallengeHistory challenges={challenges} />}
      </div>
    </div>
  );
}

export default App;