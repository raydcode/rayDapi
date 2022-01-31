const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

//Security configuration
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

// Routes
const projects = require('./routes/project');
const auth = require('./routes/auth');
const superadmin = require('./routes/superadmin');
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

//Sanitize data :
app.use(mongoSanitize());

//Set Security Headers:
app.use(helmet());
app.use(xss());

//Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// Prevent Http Parameter Pollution
app.use(hpp());

// CORS init
app.use(cors());

// Mount routers
app.use('/api/v1/projects', projects);

app.use('/api/v1/auth', auth);

app.use('/api/v1/sudoadmins', superadmin);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// Handling Unhandled Rejections :
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error : ${err.message}`);
  //  Close Server
  server.close(() => {
    process.exit(1);
  });
});
