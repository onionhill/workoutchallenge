import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  bgColor?: string; // Default: green
  buttonColor?: string; // Default: teal
};

const CompletionMessage  = ({
  icon,
  message,
  buttonText,
  onButtonClick,
  bgColor = "bg-green-600",
  buttonColor = "bg-teal-600 hover:bg-teal-700",
}: Props) => {
  return (
    <>
      <div className={`mt-4 p-4 ${bgColor} text-white rounded-lg flex items-center`}>
        <span className="mr-2 text-3xl">{icon}</span>
        <p className="text-lg">{message}</p>
      </div>
      <button
        className={`w-full p-3 mt-4 ${buttonColor} text-white rounded-lg`}
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </>
  );
};

export default CompletionMessage ;
