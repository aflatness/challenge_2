import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from "react-datepicker";
import Chart from 'chart.js';

import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data, setData] = useState('')

  const chartEl = useRef('')

  const getData = () => {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${moment(from).format('YYYY-MM-DD')}&end=${moment(to).format('YYYY-MM-DD')}`)
      .then(({ data }) => {
        setData(data.bpi);
      })
      .catch(console.log);
  }

  useEffect(() => {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(({ data }) => {
        setData(data.bpi);
      })
      .catch(console.log);
  }, [])
  const ctx = chartEl.current;
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
  return (
    <>
      <div>
        <DatePicker selected={from} onChange={date => setFrom(date)} />
        <DatePicker selected={to} onChange={date => setTo(date)} />
        <button onClick={getData}>Search</button>
      </div>
      <canvas ref={chartEl} style={{height: '200px', width: '400px'}}></canvas>
    </>
  )
}

export default App;