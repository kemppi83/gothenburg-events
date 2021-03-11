import React, { useState } from 'react';
import Pagination from '../pagination/Pagination';
import PopUp from '../popup/PopUp';
import './App.css';

const App = () => {
  const [eventsObj, setEvents] = useState();
  const [error, setError] = useState('');
  const [toggle, setToggle] = useState(false);
  const [details, setDetails] = useState(false);

  const fetchData = async (url, single = false) => {
    try {
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resultJson = await result.json();
      // console.log(resultJson);
      if (single) {
        setDetails(resultJson);
        setToggle(!toggle);
      } else {
        setEvents(resultJson);
      }
    } catch (err) {
      // console.log(err);
      setError(err.message);
    }
  };

  const handleSubmit = () => {
    const url = 'http://localhost:3001?fromDate=2021-03-11&&toDate=2021-03-12&&size=12&&page=0';
    fetchData(url);
  };

  const handlePopup = e => {
    // console.log('e.target: ', e.target.value);
    const url = `http://localhost:3001/${e.target.value}`;
    // setFetchId(e.target.value);
    fetchData(url, true);
  };

  // console.log(eventsObj, 'eventsObj');
  // console.log(error, 'error');
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
        <Pagination eventsObj={eventsObj} fetchData={fetchData} handlePopup={handlePopup} />
      ) : (
        null
      )}
      {toggle ? <PopUp details={details.content} setToggle={setToggle} /> : null}
    </div>
  );
};

export default App;
