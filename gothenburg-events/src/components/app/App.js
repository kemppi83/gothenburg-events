import React, { useState } from 'react';
import Pagination from '../pagination/Pagination';
import './App.css';

const App = () => {
  const [eventsObj, setEvents] = useState();
  const [error, setError] = useState('');

  const fetchData = async url => {
    try {
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resultJson = await result.json();
      // console.log(resultJson);
      setEvents(resultJson);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const handleSubmit = () => {
    const url = 'http://localhost:3001?fromDate=2021-03-11&&toDate=2021-03-12&&size=12&&page=0';
    fetchData(url);
  };

  console.log(eventsObj, 'eventsObj');
  console.log(error, 'error');
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gothenburg events</h1>
        <button type="button" onClick={handleSubmit}>Test</button>
      </header>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        null
      )}
      {eventsObj ? (
        <Pagination eventsObj={eventsObj} fetchData={fetchData} />
      ) : (
        null
      )}
    </div>
  );
};

export default App;
