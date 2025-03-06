export type Challenge = {
    type: string;
    reps: number;
    elapsedTime?: number; 
    sets: Set[],
    finishTime?: string;
    completed?: boolean;
  }

  export type Set = {
    reps: number;
    restTime: number; // Rest time in seconds before starting this set
  };
  

  export type TimerDisplayProps = {
    time: number;
    label: string;
  };
  