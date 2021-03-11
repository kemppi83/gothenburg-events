/* eslint-disable react/prop-types */
import React from 'react';
import EventListItem from '../eventlistitem/EventListItem';
import './EventList.css';

const EventList = ({ eventsObj, handlePopup }) => {
  // console.log(eventsObj.content);

  const events = eventsObj.content.map(event => (
    // <div className="container" key={event.id}>
    <EventListItem key={event.id} event={event} handlePopup={handlePopup} />
    // </div>
  ));

  return (
    <div className="event-list">{events}</div>
  );
};

export default EventList;
