export default function agent_think({ thoughts }) {
  return (
    <div className="flex-1 overflow-y-scroll p-4">
      <h2 className="text-xl font-semibold mb-4">Agent Thoughts</h2>
      <div className="space-y-4">
        {thoughts.map(({ model, type, thought }, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow">
            <div className="font-semibold">{model} ({type})</div>
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{thought}</p>
          </div>
        ))}
      </div>
    </div>
  );
}