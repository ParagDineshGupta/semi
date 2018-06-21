var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var contact = require('./routes/contact');
var addcust = require('./routes/addcust');
var searchcust = require('./routes/searchcust');
// var searchequip = require('./routes/searchequip');
var searchcomp = require('./routes/searchcomp');
var makecomp = require('./routes/makecomp');
var searchequip = require('./routes/searchequip');
var addequip = require('./routes/addequip');
var location = require('./routes/location');
var ajax = require('./routes/ajax');
var ajax2 = require('./routes/ajax2');
var equipment = require('./routes/equipment');
var operation = require('./routes/operation');
var custdetail = require('./routes/custdetail');
var locdetail = require('./routes/locdetail');
var equipdetail = require('./routes/equipdetail');
var amc = require('./routes/amc');
var service = require('./routes/service');
var app = express();
app.set('uploads', path.join(__dirname, 'uploads'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/amc', amc);
app.use('/contact', contact);
app.use('/service', service);
app.use('/addcust', addcust);
app.use('/searchcust', searchcust);
app.use('/ajax', ajax);
app.use('/ajax2', ajax2);
app.use('/equipment',equipment);
app.use('/operation', operation);
app.use('/addequip', addequip);
app.use('/custdetail', custdetail);
app.use('/locdetail', locdetail);
app.use('/equipdetail', equipdetail);
app.use('/searchcomp', searchcomp);
app.use('/makecomp', makecomp);
app.use('/location', location);
app.use('/searchequip', searchequip);


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
  res.render('error');
});

module.exports = app;
