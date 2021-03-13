/* eslint-disable import/prefer-default-export */
export const paginationUrl = (requestQuery, pageNumber) => {
  const query = { ...requestQuery };
  query.page = `${pageNumber}`;
  const keys = Object.keys(query);
  const values = Object.values(query);
  const queryArray = keys.map((item, index) => `${item}=${values[index]}`);
  return `http://localhost:3001?${queryArray.join('&&')}`;
};

export const eventTimeString = (date, text) => {
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
  return `${text}: \n ${date.toDateString()} at ${hours}:${minutes}`;
};
