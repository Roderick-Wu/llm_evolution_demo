import { Pie } from 'react-chartjs-2';

export default function PopulationChart({ population }) {
  const data = {
    labels: population.map(p => p.model),
    datasets: [{
      data: population.map(p => p.count),
      backgroundColor: ['#60A5FA', '#FBBF24', '#34D399'],
    }]
  };

  return (
    <div className="w-full h-64 p-4">
      <h2 className="text-xl font-semibold mb-4">Population Proportions</h2>
      <Pie data={data} />
    </div>
  );
}