/* eslint-disable react/prop-types */
import React from 'react';
import './EventListItem.css';

const eventTimeString = (date, text) => {
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  return `${text}: \n ${date.toDateString()} at ${hours}:${minutes}`;
};

const EventListItem = ({ event }) => {
  console.log(event);
  return (
    <div className="event-list__item">
      <img className="event-list__item" src={event.imgUrl} alt={event.imgCopyright} />
      <h3 className="event-list__title">{event.title}</h3>
      <p className="event-list__startTime">{eventTimeString(new Date(event.startTime), 'start')}</p>
      <p className="event-list__endTime">{eventTimeString(new Date(event.endTime), 'end')}</p>
      <p>{event.locationName}</p>
    </div>
  );
};

export default EventListItem;
