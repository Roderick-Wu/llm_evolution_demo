import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

import { Pie } from 'react-chartjs-2';

type PopulationItem = {
  model: string;
  count: number;
};

interface PopulationChartProps {
  population: PopulationItem[];
}

export default function PopulationChart({ population }: PopulationChartProps) {
  const data = {
    labels: population.map(p => p.model),
    datasets: [{
      data: population.map(p => p.count),
      backgroundColor: ['#60A5FA', '#FBBF24', '#34D399'],
    }]
  };

  return (
    <div className="w-64 h-48 p-2 mx-auto">
    <h2 className="text-lg font-medium mb-2 text-center">Population</h2>
    <Pie data={data} />
    </div>
  );
}