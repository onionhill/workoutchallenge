
import {formatTime} from "../utils"
import {TimerDisplayProps} from "../types"

const TimerDisplay = ({ time, label }: TimerDisplayProps) => {
  return (
    <div>
      <p>{label}: {formatTime(time)}</p>
    </div>
  );
};

export default TimerDisplay;
