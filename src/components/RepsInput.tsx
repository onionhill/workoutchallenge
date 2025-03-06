type Props = { 
    repsDone: number; 
    onRepsChange: (value: number) => void; 
    onCompleteSet: () => void 
};

const RepsInput = ({ repsDone, onRepsChange, onCompleteSet }: Props) => {
  return (
    <div className="mt-2">
      <input
        type="number"
        className="p-2 bg-gray-700 text-white rounded"
        value={repsDone}
        min="1"
        onChange={(e) => onRepsChange(Number(e.target.value))}
      />
      <button className="p-2 bg-blue-600 ml-2 rounded text-white hover:bg-blue-700" onClick={onCompleteSet}>
        Complete Set
      </button>
    </div>
  );
};

export default RepsInput;
