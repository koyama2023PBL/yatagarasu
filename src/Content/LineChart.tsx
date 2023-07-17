import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Under 10%',
        data: [12, 9, 3, 5, 2], // 10%以下のデータ
        fill: true,
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        borderColor: 'rgba(0, 0, 255, 0.5)',
      },
      {
        label: '10% - 20%',
        data: [5, 10, 13, 15, 9], // 10%以上20%以下のデータ
        fill: true,
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        borderColor: 'rgba(0, 255, 0, 0.5)',
      },
      {
        label: '20% - 30%',
        data: [15, 20, 23, 25, 19], // 20%以上30%以下のデータ
        fill: true,
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
        borderColor: 'rgba(255, 255, 0, 0.5)',
      },
      {
        label: 'Over 30%',
        data: [25, 30, 33, 35, 29], // 30%以上のデータ
        fill: true,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(255, 0, 0, 0.5)',
      },
    ],
  };
  

    const options = {
        plugins: {
        },
        options: {
          tooltips: {
            callbacks: {
                label: function (context: any) {
                  console.log(context.dataset)
                  var label = context.dataset.label || '';

                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label += new Number(context.parsed.y).toLocaleString();
                  }
                  return label;
                }
            }
      }},
        
    };

    return (
        <Line data={data} options={options} />
    );
}

export default LineChart;
