import Char from 'chart.js';

export default function createChart (ref, data) {
  const ctx = ref.current;
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Object.keys(data),
        datasets: [{
            label: 'BTC Closing prices',
            data: Object.values(data),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
            ],
            borderColor: [
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }
  });
}