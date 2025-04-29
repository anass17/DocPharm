import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { height } from '@mui/system';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Chart({chartData, name}) {

    const data = {
        labels: chartData.labels,
        datasets: [
        {
            label: name,
            data: chartData.data,
            fill: false,
            backgroundColor: '#007BFF',
            borderColor: '#007BFF',
            tension: 0.3,
        },
        ],
    };

    return <Line data={data} options={{
        responsive: true,
        maintainAspectRatio: false,
      }} 
    />;
}
