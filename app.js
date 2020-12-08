import createError from "http-errors";
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import { registerHelper } from "./libs/hbsHelper";
import multer from "multer"
import indexRouter from "./routes/index";

var app = express(); // express
dotenv.config(); // using dotenv file

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout/layout' });
// view engine helper
registerHelper();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error/error');
});

// PORT INIT
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`App is running at PORT ${PORT}`);
});

// set store for image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})
 
var upload = multer({ storage: storage })