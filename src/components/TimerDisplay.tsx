type TimerDisplayProps = {
  time: number;
  label: string;
};

const TimerDisplay = ({ time, label }: TimerDisplayProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min ` : ''}${secs} sec`;
  };
  

  return (
    <div>
      <p>{label}: {formatTime(time)}</p>
    </div>
  );
};

export default TimerDisplay;
