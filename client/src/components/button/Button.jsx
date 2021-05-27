/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ url, rel, fetchData }) => {
  const buttonClass = `${rel}-button button`;
  let buttonText = '';
  switch (rel) {
    case 'first':
      buttonText = '<<';
      break;
    case 'prev':
      buttonText = '<';
      break;
    case 'next':
      buttonText = '>';
      break;
    default:
      buttonText = '>>';
      break;
  }
  return (
    <button type="button" className={buttonClass} value={url} onClick={e => fetchData(e.target.value)}>{buttonText}</button>
  );
};
export default Button;
