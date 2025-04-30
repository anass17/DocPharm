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
import { data } from 'react-router-dom';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Chart({chartData, name}) {

    const data = {
        labels: chartData.labels,

        datasets: chartData.dataset ? chartData.dataset.map((item) => ({
          label: item.label,
          data: item.data,
          borderColor: item.borderColor,
          fill: false,
          tension: 0.3,
        })) : [
          {
          label: name,
          data: chartData.data,
          fill: false,
          backgroundColor: '#007BFF',
          borderColor: '#007BFF',
          tension: 0.3,
        }
      ],
    };

    return <Line data={data} options={{
        responsive: true,
        maintainAspectRatio: false,
      }} 
    />;
}
