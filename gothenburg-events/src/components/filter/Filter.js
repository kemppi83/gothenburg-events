/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import './Filter.css';

const Filter = ({ fetchData }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);
  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE);
  };

  // if (startDate) {
  //   const test = format(startDate, 'yyyy-MM-dd', { locale: enGB });
  //   console.log('format: ', test, typeof test);
  // }

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

  return (
    <div className="calendar-container">
      <p>
        Selected start date:
        {startDate ? format(startDate, 'yyyy-MM-dd', { locale: enGB }) : 'none'}
        .
      </p>
      <p>
        Selected end date:
        {endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}
        .
      </p>
      <p>
        Currently selecting:
        {focus}
        .
      </p>
      <DateRangePickerCalendar
        startDate={startDate}
        endDate={endDate}
        focus={focus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFocusChange={handleFocusChange}
        locale={enGB}
      />
      <div className="form-container">
        <form className="form" autoComplete="off" onSubmit={e => handleCallback(e)} onFocus={e => handleFormFocus(e)}>
          <input className="search-input" type="text" name="search" placeholder="Optional" list="datalist" />
          <datalist id="datalist" />
          <input type="submit" className="submit-button" value="Search events" />
        </form>
      </div>
    </div>
  );
};

export default Filter;
