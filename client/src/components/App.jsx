import React, { useState } from 'react';
import Pagination from './pagination/Pagination';
import PopUp from './popup/PopUp';
import Filter from './filter/Filter';

const App = () => {
  // force deploy Netlify
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
    const url = `${process.env.REACT_APP_SERVER_URL}/${e.target.value}`;
    fetchData(url, true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gothenburg events</h1>
      </header>
      <p className="intro">Find out what&apos;s going on in Gothenburg!</p>
      <Filter fetchData={fetchData} />
      {error && <p className="error-message">{error}</p>}
      {eventsObj
        && <Pagination eventsObj={eventsObj} fetchData={fetchData} handlePopup={handlePopup} />}
      {toggle && <PopUp details={details.content} setToggle={setToggle} />}
    </div>
  );
};

export default App;
