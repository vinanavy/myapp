require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Require user route
const userRouter = require('./routes/user.routes');
app.use('/user', userRouter);
const loginRouter = require('./routes/login.routes');
app.use('/login', loginRouter);

// Catch 404
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use(() => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Star server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT} `);
});
