import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const years = [];

for(let i = -300; i < 2013; i++ ) {
  years.push(i);
}

const App = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`/events?_page=${page}${year ? `&date=${year}` : ''}${search ? `&q=${search}` : ''}`)
      .then(({ data }) => setData(data.body))
      .catch(console.log);
  }, [page, year, search]);

  console.log(data, year, search)
  return (
    <div>
      <label>Year to search: {''}
        <select value={year} onChange={(e) => setYear(e.target.value)} >
          {years.map(v => <option value={v}>{v}</option>)}
        </select>
        <button onClick={() => setYear('')} >Clear year query</button>
      </label>
      <br/>
      <br/>
      <label>Search: {''}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <br/>
      {data.length ? data.map(d => (
        <ul>
          <li>{d.date}</li>
          <li>{d.description}</li>
          <li>{d['category2']}</li>
        </ul>
        )
      ) : null}
      <ReactPaginate onPageChange={(d) => setPage(d.selected + 1)} />
    </div>
  )
}

export default App;