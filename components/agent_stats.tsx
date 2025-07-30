export default function agent_stats({ stats }) {
  return (
    <div className="w-1/4 p-4 border-l overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-4">Agent Stats</h2>
      {stats.map(({ model, score, reputation }, i) => (
        <div key={i} className="mb-4">
          <div className="font-medium">{model}</div>
          <div className="text-sm">Score: {score}</div>
          <div className="text-sm">Reputation: {reputation}</div>
        </div>
      ))}
    </div>
  );
}