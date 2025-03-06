import { HiTrophy } from "react-icons/hi2";

type Props = { challengeType: string; onComplete: () => void };

const CompletionMessage = ({ challengeType, onComplete }: Props) => {
  return (
    <>
        <div className="mt-4 p-4 bg-green-600 text-white rounded-lg flex items-center">
        <HiTrophy className="mr-2 text-3xl" /> {/* Adjust the icon size and margin */}
        <p className="text-lg">Congratulations! You've completed the {challengeType} challenge!</p>
        </div>
        <button 
        className="w-full p-3 mt-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
        onClick={onComplete}
        >
        Complete Challenge
        </button>
    </>
  );
};

export default CompletionMessage;
