import { useEffect, useState } from 'react';
import round_slider from '@/components/round_slider';
import agent_think from '@/components/agent_think';
import agent_stats from '@/components/agent_stats';
import population_chart from '@/components/population_chart';

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
        playoff_matrix: [CC: number[], CD: number[], DC: number[], DD: number[]]
    }
  }; 
  evolution: {initial_population: string; steps: number;}; 
  mechanism: {type: string};
  agents: {llm: {model: string, kwargs: {max_new_tokens: number}}; type: string; }[];
};

export default function Home() {
  const [game_data, set_all] = useState<game_data | null>(null);
  const [round_data, set_round] = useState<step_data[]>([]);
  const [selected_round, set_selected_round] = useState(0);

  useEffect(() => {
    const fetchData = async () => {

      const setup_game = await fetch(`@/test_setup.json`);
      const game_info = await setup_game.json();
      set_all(game_info);

      const res = await fetch(`@/test_data.json`);
      const json = await res.json();
      set_round(json);

    };
    fetchData();
  }, []);

  if (round_data == null || round_data.length === 0) return <div className="p-4">Loading...</div>;



  const this_round_data = round_data[selected_round] || {};


  const agent_thoughts: Record<string, string> = {};
  const agent_stats: Record<string, { score: number; reputation: reputation }> = {};
  const population = this_round_data.population;

  this_round_data.match_records.flat().forEach((agent) => {
    const [model, type] = agent.name.split('(');
    const clean_model = model.trim();
    const clean_type = type.replace(')', '').trim();

    // Use only the first occurrence of the thought
    if (!agent_thoughts[clean_model]) {
      agent_thoughts[clean_model] = {
        model: clean_model,
        type: clean_type,
        thought: agent.response.startsWith('Thought:') ? agent.response : `Response: ${agent.response}`,
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
    <div className="flex flex-col h-screen">
      <round_slider
        maxRounds={data.length - 1}
        selectedRound={selectedRound}
        onChange={setSelectedRound}
      />
      <div className="flex flex-1 overflow-hidden">
        <agent_think thoughts={thoughts} />
        <agent_stats stats={stats} />
      </div>
      <population_chart population={populationChart} />
    </div>
  );
} 