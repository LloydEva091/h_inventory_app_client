import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const BarChart = (props) => {
  const { data } = props

  // Extract the labels and data values from the passed in data
  const labels = data.map(item => item.name)
  const values = data.map(item => item.value)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'My Spending',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: values
      }
    ]
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  useEffect(() => {
    // Destroy the chart when the component is unmounted
    return () => {
      window.chart.destroy()
    }
  }, [])

  return <Bar data={chartData} options={options} ref={ref => window.chart = ref} />
}

export default BarChart