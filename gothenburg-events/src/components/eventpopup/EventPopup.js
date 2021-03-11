/* eslint-disable react/prop-types */
import React from 'react';
import SanitizedHTML from 'react-sanitized-html';

const EventListItem = ({ event }) => {
  console.log(event);
  console.log(Object.keys(event));
  console.log(Object.values(event));
  return (
    // <div className="event-list-item">
    <div className="event-list-item">
      <p className="title">{event.title}</p>
      <SanitizedHTML className="description" html={event.description} />
    </div>
  );
};

export default EventListItem;
