interface Thought {
  model: string;
  type: string;
  thought: string;
}

interface AgentThinkProps {
  thoughts: Thought[];
}

export default function AgentThink({ thoughts }: AgentThinkProps) {
return (
    <div className="thoughts-container">
      <h2 className="thoughts-header">Agent Thoughts</h2>
      
      <div className="thoughts-list">
        {
          thoughts.map(({ model, type, thought }, i) => (
            <div key={i} className="thought-card">
              <div className="thought-header">
                <span className="thought-model">{model}</span>
                <span className="thought-type">{type}</span>
              </div>
              
              <div className="thought-content">
                <p>{thought}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}