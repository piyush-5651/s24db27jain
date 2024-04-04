require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var raftboat = require('./models/raftboat');

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

async function recreateDB(){

  await raftboat.deleteMany();

  let instance1 = new raftboat({ substance: "Plastic", size: "small", price: 550 });
  let instance2 = new raftboat({ substance: "Rubber", size: "Medium", price: 770 });
  let instance3 = new raftboat({ substance: "kryptonite", size: "Large", price: 5000 });

  await instance1.save().then(doc =>{
    console.log("First Object Saved")
  }).catch(error=> {
      console.error(error)
  })

  await instance2.save().then(doc =>{
    console.log("Second Object Saved")
  }).catch(error=> {
      console.error(error)
  })

  await instance3.save().then(doc =>{
    console.log("Third Object Saved")
  }).catch(error=> {
      console.error(error)
  })
}

let reseed = true;
if (reseed) {recreateDB();}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var raftboatRouter = require('./routes/raftboat');
var gridRouter = require('./routes/grid');
var randomItemRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/raftboat', raftboatRouter);
app.use('/grid',gridRouter);
app.use('/randomitem', randomItemRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
