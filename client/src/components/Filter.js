/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';

const Filter = ({ fetchData }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);
  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE);
  };

  const handleCallback = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search');

    if (search) {
      const hist = [];
      if (localStorage.getItem('search') != null) {
        hist.push(...JSON.parse(localStorage.getItem('search')));
      }
      if (!hist.some(item => item === search)) {
        hist.unshift(search);
      }
      localStorage.setItem('search', JSON.stringify(hist));
    }

    const queryArray = [];
    if (startDate) {
      queryArray.push('fromDate='.concat(format(startDate, 'yyyy-MM-dd', { locale: enGB })));
    }

    if (endDate) {
      queryArray.push('toDate='.concat(format(endDate, 'yyyy-MM-dd', { locale: enGB })));
    }

    if (search) {
      queryArray.push('searchTerm='.concat(search));
    }

    queryArray.push('size=12', 'page=0');

    e.target.querySelector('.search-input').value = '';
    fetchData(`http://localhost:3001?${queryArray.join('&&')}`);
  };

  const handleFormFocus = e => {
    console.log('e.target.className: ', e.target.className);
    if (e.target.className === 'search-input') {
      e.target.nextElementSibling.innerHTML = '';
      if (localStorage.getItem('search') != null) {
        const searchArray = JSON.parse(localStorage.getItem('search'));
        searchArray.forEach(i => {
          const node = document.createElement('option');
          const val = document.createTextNode(i);
          node.appendChild(val);
          e.target.nextElementSibling.appendChild(node);
        });
      }
    }
  };

  const clearDates = () => {
    setStartDate();
    setEndDate();
    handleFocusChange(START_DATE);
  };

  return (
    <div className="input-container">
      <div className="calendar-container">
        <DateRangePickerCalendar
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onFocusChange={handleFocusChange}
          locale={enGB}
        />
      </div>
      <div className="text-container">
        <h2 className="input-title">Filter events</h2>
        <p>
          {!(startDate || endDate)
            ? 'You can filter events by date.'
            : 'Search period:' }
        </p>
        <p>
          {startDate ? `start date: ${format(startDate, 'dd MMM yyyy', { locale: enGB })}` : null}
        </p>
        <p>
          {endDate ? `end date: ${format(endDate, 'dd MMM yyyy', { locale: enGB })}` : null}
        </p>
        <p>
          {(startDate || endDate)
            ? <button type="button" className="clear" onClick={() => clearDates()}>clear</button>
            : null }
        </p>
        <form className="form" autoComplete="off" onSubmit={e => handleCallback(e)} onFocus={e => handleFormFocus(e)}>
          <input className="search-input" type="text" name="search" placeholder="Text search" list="datalist" />
          <datalist id="datalist" />
          <input type="submit" className="submit-button" value="Search events" />
        </form>
      </div>
    </div>
  );
};

export default Filter;
