const extractPagination = data => ({
  currentPage: data.number,
  totalPages: data.totalPages,
  firstPage: data.first,
  lastPage: data.last,
});

const extractPreview = data => data.map(event => ({
  id: event.id,
  title: event.title,
  startTime: event.startTime,
  endTime: event.endTime,
  ...event.location.name && { locationName: event.location.name },
  ...event.location.latitude && { locationLat: event.location.latitude },
  ...event.location.longitude && { locationLon: event.location.longitude },
  ...event.image && { imgUrl: `${event.image.host}${event.image.path}` },
  ...event.image.copyright && { imgCopyright: event.image.copyright },
}));

module.exports = {
  extractPagination,
  extractPreview,
};
