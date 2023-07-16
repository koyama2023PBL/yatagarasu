import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    const options = {
        plugins: {
        },
        tooltips: {
          callbacks: {
              label: function (context: any) {
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
      }
    };

    return (
        <Line data={data} options={options} />
    );
}

export default LineChart;
