/* eslint-disable react/prop-types */
import React from 'react';
import EventListItem from './EventListItem';

const EventList = ({ eventsObj, handlePopup }) => {
  const events = eventsObj.content.map(event => (
    <EventListItem key={event.id} event={event} handlePopup={handlePopup} />
  ));

  return (
    <div className="event-list">{events}</div>
  );
};

export default EventList;
