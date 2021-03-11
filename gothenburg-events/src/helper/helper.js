/* eslint-disable import/prefer-default-export */
export const paginationUrl = (requestQuery, pageNumber) => {
  const query = { ...requestQuery };
  query.page = `${pageNumber}`;
  const keys = Object.keys(query);
  const values = Object.values(query);
  const queryArray = keys.map((item, index) => `${item}=${values[index]}`);
  // console.log('queryArray: ', queryArray);
  return `http://localhost:3001?${queryArray.join('&&')}`;
  // console.log('query: ', query);
};
