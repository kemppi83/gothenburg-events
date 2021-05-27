/* eslint-disable react/prop-types */
import React from 'react';
import { eventTimeString } from '../../helper/helper';

const EventListItem = ({ event, handlePopup }) => (
  <div className="event-list__item">
    <div className="item__info">
      <div className="img-container">
        <img className="event-list__img" src={event.imgUrl} alt={event.imgCopyright} />
      </div>
      <h3 className="event-list__title">{event.title}</h3>
      <p className="event-list__startTime">{eventTimeString(new Date(event.startTime), 'start')}</p>
      <p className="event-list__endTime">{eventTimeString(new Date(event.endTime), 'end')}</p>
      <p>{event.locationName}</p>
    </div>
    <button type="button" className="event-list__button--info" value={event.id} onClick={e => handlePopup(e)}>More info</button>
  </div>
);

export default EventListItem;
