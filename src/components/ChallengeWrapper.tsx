import ChallengeForm from "./ChallengeForm";
import ActiveChallenge from "./ActiveChallenge";
import ChallengeHistory from "./ChallengeHistory";
import CompletionMessage from "./CompletionMessage";
import { useState } from "react";
import { Challenge } from "../types";
import CONFIG from "../../config";
import {HiTrophy,HiXCircle} from "react-icons/hi2"



const ChallengeWrapper = () => {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [challengeSuccess, setchallengeSuccess] = useState(false);


  const completeChallenge = async (challenge: Challenge) => {
    
    try {
      const response = await fetch(`${CONFIG.API_URL}/challenges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(challenge),
      });
  
      console.log('Response status:', response.status); // HTTP status code (e.g., 200)
      console.log('Response statusText:', response.statusText); // HTTP status message (e.g., 'OK')
      console.log('Response headers:', response.headers); // Headers object
      
  
      // Check if the response is ok (status 2xx)
      if (!response.ok) {
        throw new Error(`Failed to post challenge. Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Server response:", result);
  
      if (result.success) {
        console.log("Challenge posted successfully.");
        setchallengeSuccess(challenge.completed!); // Update the parent component state on success
        setActiveChallenge(null);
        const completionMessage = challenge.completed!
          ? "Congratulations! You've completed the challenge!"
          : "Challenge canceled. Better luck next time!";
        setInfoMessage(completionMessage)
    
      } else {
        console.error("Server responded with an error");
      }
    } catch (error) {
      console.error("Error posting challenge:", error);
    }
  };

  const startChallenge = (challenge: Challenge) => {
    setInfoMessage("");
    setActiveChallenge(challenge);
  };
  return (
    <>
     {infoMessage && (
          <CompletionMessage
            icon={challengeSuccess ? <HiTrophy />: <HiXCircle /> }
            message={infoMessage}
            bgColor={challengeSuccess ? "bg-green-600" : "bg-red-600"}
          />
        )}
    {!activeChallenge ? (
        
        <ChallengeForm onStart={startChallenge} />
      ) : (
        <ActiveChallenge
          challenge={activeChallenge}
          onComplete={completeChallenge}
          
        />
      )}
      { !activeChallenge && <ChallengeHistory />}
    </>
  )

}

export default ChallengeWrapper;