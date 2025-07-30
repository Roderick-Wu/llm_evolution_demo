export default function AgentStats({ stats }) {
  return (
    <div className="w-1/2 p-4 border-l overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-12">Agent Stats</h2>
      {stats.map(({ model, score, reputation }, i) => (
        <div key={i} className="mb-8">
          <div className="font-medium font-semibold">{model}</div>
          <div className="text-sm">Score: {score}</div>
          <div className="text-sm">Reputation: {reputation}</div>
        </div>
      ))}
    </div>
  );
}