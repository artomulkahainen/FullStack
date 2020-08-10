const config = require('./utils/config');
const express = require('express');
const app = express();
require('express-async-error');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Mongoose connected succesfully to db');
  })
  .catch(() => {
    logger.error('Error with connecting to db');
  });

mongoose.set('useFindAndModify', false);
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testRouter');
  app.use('/api/testing', testingRouter);
};

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
