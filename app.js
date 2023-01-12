var createError = require('http-errors');
var express = require('express')

, engine = require('ejs-locals')
, app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let session = require('express-session')

var rememberCookieMiddleware = require('./middlewares/rememberCookieMiddleware')
var userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

var app = express();
app.use(session({
  secret: "secret-secret by florencia",
  resave: false,
  saveUninitialized: false,
}));


var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartsRouter = require('./routes/carts');

/////// CORS  ///////
const cors=require("cors");
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
/////// CORS  ///////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(userLoggedMiddleware)
app.use(rememberCookieMiddleware)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const PORT = process.env.PORT || 3000
const dbConfig ={
  host: process.env.DB_HOST || "0.0.0.0",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  password: process.env.DB_NAME || "snowboard"
}
app.listen(PORT,()=>{
  console.log('El servidor 3000 se levanto 123🎈')
})


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
