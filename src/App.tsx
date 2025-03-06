
import ChallengeWrapper from "./components/ChallengeWrapper";
import image from "./logo.jpeg";

function App() {

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
       
        <ChallengeWrapper  /> 
        
      </div>
    </div>
  );
}

export default App;


/*

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

    onCancel(message); // Pass message back to App component
  };

  */