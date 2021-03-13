import React, { useState } from 'react';
import Pagination from './Pagination';
import PopUp from './PopUp';
import Filter from './Filter';

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
      if (single) {
        setDetails(resultJson);
        setToggle(!toggle);
      } else {
        setEvents(resultJson);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePopup = e => {
    const url = `http://localhost:3001/${e.target.value}`;
    fetchData(url, true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gothenburg events</h1>
      </header>
      <p className="intro">Find out what&apos;s going on in Gothenburg!</p>
      <Filter fetchData={fetchData} />
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
