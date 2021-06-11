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
  ...event.location && event.location.name && { locationName: event.location.name },
  ...event.location && event.location.latitude && { locationLat: event.location.latitude },
  ...event.location && event.location.longitude && { locationLon: event.location.longitude },
  ...event.image && { imgUrl: `${event.image.host}${event.image.path}` },
  ...event.image && event.image.copyright && { imgCopyright: event.image.copyright },
}));

const extractDetails = event => ({
  id: event.id,
  title: event.title,
  description: event.description,
  startTime: event.startTime,
  endTime: event.endTime,
  ...event.location && event.location.name && { locationName: event.location.name },
  ...event.location && event.location.latitude && { locationLat: event.location.latitude },
  ...event.location && event.location.longitude && { locationLon: event.location.longitude },
  ...event.image && { imgUrl: `${event.image.host}${event.image.path}` },
  ...event.image && event.image.copyright && { imgCopyright: event.image.copyright },
});

module.exports = {
  extractPagination,
  extractPreview,
  extractDetails,
};
