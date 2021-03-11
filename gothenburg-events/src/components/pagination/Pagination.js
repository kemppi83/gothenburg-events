/* eslint-disable react/prop-types */
import React from 'react';
import EventList from '../eventlist/EventList';
import Button from '../button/Button';
import { paginationUrl } from '../../helper/helper';
import './Pagination.css';

const Pagination = ({ eventsObj, fetchData, handlePopup }) => {
  const {
    currentPage, firstPage, lastPage, totalPages,
  } = eventsObj.pagination;
  const buttonUrls = [];
  const buttonRels = [];

  if (!firstPage) {
    buttonUrls.push(paginationUrl(eventsObj.query, 0));
    buttonUrls.push(paginationUrl(eventsObj.query, currentPage - 1));
    buttonRels.push('first', 'prev');
  }

  if (!lastPage) {
    buttonUrls.push(paginationUrl(eventsObj.query, currentPage + 1));
    buttonUrls.push(paginationUrl(eventsObj.query, totalPages - 1));
    buttonRels.push('next', 'last');
  }

  // console.log('buttonUrls: ', buttonUrls);
  // console.log('buttonRels: ', buttonRels);
  const buttons = buttonUrls.map((link, index) => (
    <Button key={buttonRels[index]} url={link} rel={buttonRels[index]} fetchData={fetchData} />
  ));
  return (
    <div>
      <EventList eventsObj={eventsObj} handlePopup={handlePopup} />
      <div className="buttons-container">
        <div className="buttons">{buttons}</div>
      </div>
    </div>
  );
};

export default Pagination;
