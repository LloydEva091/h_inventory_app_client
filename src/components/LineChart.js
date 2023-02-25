import React from 'react'

const LineChart = ({ data }) => {
  // Calculate the maximum value in the data array
  const maxValue = Math.max(...data.map(d => d.value))

  // Calculate the x and y coordinates for each point on the line
  const points = data.map(({ value }, index) => {
    const x = index * (100 / (data.length - 1)) // Calculate the x coordinate
    const y = (1 - value / maxValue) * 50 // Calculate the y coordinate (scaled to fit within the chart height)
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="w-full h-56 bg-white shadow-lg ">
      <svg viewBox="0 0 100 50" className="h-full w-full">
        <polyline points={points} stroke="blue" strokeWidth="2" fill="none" />
        {data.map(({ name }, index) => (
          <text key={index} x={index * (100 / (data.length - 1))} y={50} fontSize="12">{name}</text>
        ))}
        {data.map((d, i) => (
          <text key={i} x="-15" y={(1 - d.value / maxValue) * 50} fontSize="12">{d.value}</text>
        ))}
      </svg>
    </div>
  )
}

export default LineChart