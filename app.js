let  express = require('express');
let  path = require('path');
let  favicon = require('serve-favicon');
let  logger = require('morgan');
let  cookieParser = require('cookie-parser');
let  bodyParser = require('body-parser');
let  routes = require('./routes');
let cors = require('cors');
let  app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({err});
});

module.exports = app;
