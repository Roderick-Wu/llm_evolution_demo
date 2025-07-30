type RoundSliderProps = {
  maxRounds: number;
  selectedRound: number;
  onChange: (round: number) => void;
};

export default function RoundSlider({ maxRounds, selectedRound, onChange }: RoundSliderProps) {
  return (
    <div className="w-full p-4">
      <label className="block text-sm font-semibold mb-2">Round: {selectedRound}</label>
      <input
        type="range"
        min="0"
        max={maxRounds}
        value={selectedRound}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}