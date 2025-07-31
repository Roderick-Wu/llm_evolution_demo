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
      <div className="chart-content">
        <div className="chart-inner">
          {data && data.datasets && data.datasets[0]?.data?.length > 0 ? (
            <div className="chart-canvas">
              <Pie 
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: window.innerWidth < 768 ? 'bottom' : 'right',
                      labels: {
                        boxWidth: window.innerWidth < 768 ? 12 : 16,
                        padding: window.innerWidth < 768 ? 8 : 12,
                        font: {
                          size: window.innerWidth < 768 ? 11 : 12
                        },
                        usePointStyle: true
                      }
                    }
                  }
                }}
              />
            </div>
          ) : (
            <div className="chart-empty">
              <div className="chart-empty-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p><strong>No population data</strong></p>
              <p>Data will appear when simulation starts</p>
            </div>
          )}
        </div>
      </div>
  );
}