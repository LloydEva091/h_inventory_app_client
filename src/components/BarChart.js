import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { useState } from 'react';
  import { Bar } from 'react-chartjs-2';

import React from 'react'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
const BarChart = ({props}) => {

    // Extract the labels and data values from the passed in data
    const labels = props.map(item => item.name)
    const values = props.map(item => item.value)

    const [data, setData] = useState({
      labels: labels,
      datasets: [{
        label: 'Expenses',
        data: values,
        backgroundColor: [
          'rgb(153, 102, 255)'
        ],
        borderColor: [
          'rgb(153, 102, 255)'
        ],
        borderWidth: 1
      }]
    });


    return <Bar data={data} legend={{ position: 'center' }} />;
  };

  export default BarChart