/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import SanitizedHTML from 'react-sanitized-html';
import './PopUp.css';
import { eventTimeString } from '../../helper/helper';

const PopUp = ({ details, setToggle }) => {
  console.log(details);

  const handleClick = () => {
    setToggle(toggle => !toggle);
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        {details ? (
          <div className="event-list__item">
            <img className="event-list__item" src={details.imgUrl} alt={details.imgCopyright} />
            <h3 className="event-list__title">{details.title}</h3>
            <SanitizedHTML className="description" html={details.description} />
            <p className="event-list__startTime">{eventTimeString(new Date(details.startTime), 'start')}</p>
            <p className="event-list__endTime">{eventTimeString(new Date(details.endTime), 'end')}</p>
            <p>{details.locationName}</p>
          </div>
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default PopUp;
