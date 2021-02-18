import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from "react-datepicker";
// import Chart from 'chart.js';
import createChart from './controller.js'

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

  useEffect(() => {
    createChart(chartEl, data);
  }, [data])

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