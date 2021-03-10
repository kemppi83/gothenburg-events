import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState([]);
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
      console.log(resultJson);
      setInput(resultJson);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  const handleSubmit = () => {
    const url = 'http://localhost:3001/';
    fetchData(url);
  };
  console.log(input, 'input');
  console.log(error, 'error');
  return (
    <div className="App">
      <header className="App-header">
        <button type="button" onClick={handleSubmit}>Test</button>
        {error}
        {input}
      </header>
    </div>
  );
};

export default App;
