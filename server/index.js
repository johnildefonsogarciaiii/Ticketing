const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');


const app = express();
app.use(express.json());

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `https://ticketing-fronend.vercel.app`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

// app.use(cors(
//     {
//     origin: 'https://ticketing-fronend.vercel.app',
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     credentials: true,
// }
// ));

  app.use(allowCrossDomain);
app.use(cookieParser());


//Error handling
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");


//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XXS
app.use(xss());


//Routers
const userRouter = require('./routes/userRoutes');
const ticketRouter = require('./routes/ticketRoutes');


//GLOBAL middlewares
//Security HTTP headers
app.use(helmet());







//Routes
app.get('/', function (req, res) {
    res.json("Success!");
});
app.use('/user', userRouter);
app.use('/ticket', ticketRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app
