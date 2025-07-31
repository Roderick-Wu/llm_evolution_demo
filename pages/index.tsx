import { useEffect, useState } from 'react';
import RoundSlider from '@/components/round_slider';
import AgentThink from '@/components/agent_think';
import AgentStats from '@/components/agent_stats';
import PopulationChart from '@/components/population_chart';
//import '@/globals.css';

type reputation = {
  cooperation_rate: number | null;
  betrayal_rate: number | null;
};

type agent_match = {
  name: string;
  action: string;
  points: number;
  response: string;
  reputation: reputation;
};

type step_data = {
  step: number;
  population: number[];
  match_records: agent_match[][];
};

type game_data = {
  game: {type: string;
    kwargs: {
        payoff_matrix: {
        CC: number[],
        CD: number[],
        DC: number[],
        DD: number[]
        };
    }
  };
  evolution: {initial_population: string; steps: number;};
  mechanism: {type: string};
  agents: {llm: {model: string, kwargs: {max_new_tokens: number}}; type: string; }[];
};

export default function Home() {
  const [game_data, set_all] = useState<game_data | null>(null);
  const [round_data, set_round] = useState<step_data[] | null>(null);
  const [selected_round, set_selected_round] = useState(0);

  useEffect(() => {
    const fetchData = async () => {

      const setup_game = await fetch(`https://raw.githubusercontent.com/Xiao215/agent-tournament/main/results/example_config.json`);
      const game_info = await setup_game.json();
      set_all(game_info);

      const res = await fetch(`https://raw.githubusercontent.com/Xiao215/agent-tournament/main/results/example_evolution.json`);
      const json = await res.json();
      set_round(json);

    };
    fetchData();
  }, []);

  if (round_data == null || round_data.length === 0) return <div className="p-4">Loading...</div>;



  const this_round_data = round_data[selected_round] || {};


  const agent_thoughts: Record<string, { model: string; type: string; thought: string }> = {};
  const agent_stats: Record<string, { score: number; reputation: reputation }> = {};
  const population = this_round_data.population;

  this_round_data.match_records.flat().forEach((agent) => {
    const [model, type] = agent.name.split('(');
    const clean_model = model.trim();
    const clean_type = type.replace(')', '').trim();

    if (!agent_thoughts[clean_model]) {
      agent_thoughts[clean_model] = {
        model: clean_model,
        type: clean_type,
        thought: agent.response.startsWith('Thought:') ? agent.response : `... sitting out this round ...`,
      };
    }

    // Aggregate stats
    if (!agent_stats[clean_model]) {
      agent_stats[clean_model] = {
        score: 0,
        reputation: agent.reputation,
      };
    }
    agent_stats[clean_model].score += agent.points;
  });

  const thoughts = Object.entries(agent_thoughts).map(([model, thoughtObj]) => ({
    ...thoughtObj,
  }));

  const stats = Object.entries(agent_stats).map(([model, stat], i) => ({
    model,
    score: stat.score,
    reputation: stat.reputation.cooperation_rate ?? 0,
  }));

  const populationChart = Object.keys(agent_stats).map((model, i) => ({
    model,
    count: population[i] * 100, // scale for visualization
  }));

return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">LLM Evolution Demo</h1>
      </header>

      <div className="main-layout">

        <div className="upperbar">

          <div className="info-section">
            <h2 className="upperbar-title">Game Setup</h2>
            <div className="game-setup-item"><strong>Game Type:</strong> {game_data?.game.type}</div>
            <div className="game-setup-item"><strong>Mechanism:</strong> {game_data?.mechanism.type}</div>
            <div className="game-setup-item"><strong>Initial Population:</strong> {game_data?.evolution.initial_population}</div>
            <div className="game-setup-item"><strong>Rounds:</strong> {game_data?.evolution.steps}</div>
          </div>

          <div className="chart-section">
            <h2 className="upperbar-title">Population Chart</h2>
            <PopulationChart population={populationChart} />
          </div>

          <div className="slider-section">
            <h2 className="upperbar-title">Round Select</h2>
            <div className="text-center">
              <RoundSlider
                maxRounds={round_data.length - 1}
                selectedRound={selected_round}
                onChange={set_selected_round}
              />
            </div>
          </div>

        </div>

        <div className="content-area">

          <div className="agents-container">
            <div className="thoughts-section">
              <AgentThink thoughts={thoughts} />
            </div>
            <div className="stats-section">
              <AgentStats stats={stats} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );

}