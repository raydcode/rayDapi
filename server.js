const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//Security configuration
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')
// Routes
const projects = require('./routes/project');
const auth = require('./routes/auth');

//MiddleWares
const errorHandler = require('./middleware/errorHandler');

// Config
dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

const app = express();

app.use(express.json());

// Middleware Mounting:
if (process.env.NODE_ENV === 'development') {
  // app.use(logger);
  const morgan = require('morgan');
  app.use(morgan('dev'));
  require('colors');
}

app.use(cookieParser());



//Santize data :
app.use(mongoSanitize());

//Set Security Headers:
app.use(helmet());
app.use(xss());

// Mount routers
app.use('/api/v1/projects', projects);

app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handling Unhandled Rejections :
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error : ${err.message}`.red.bold);
  //  Close Server
  server.close(() => {
    process.exit(1);
  });
});
