const { app } = require('./app.js');

app.listen(process.env.PORT, () => {
  console.log(`Resource Server Ready on port ${process.env.PORT}`);
});
