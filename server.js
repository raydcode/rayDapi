const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Routes
const projects = require('./routes/project');

//MiddleWares
const logger = require('./middleware/logger');
const morgan =require('morgan');

// Config
dotenv.config({ path: './config/config.env' });

// Connect DB
connectDB();

const app = express();

// Middleware Mounting:
if(process.env.NODE_ENV === 'development'){
    // app.use(logger);
    app.use(morgan('dev'));
}


// Mount routers

app.use('/api/v1/projects', projects);

const PORT = process.env.PORT || 5000;

const server =app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handling Unhandled Rejections :

process.on('unhandledRejection',(err,promise) => {
   console.log(`Error : ${err.message}`);
  //  Close Server
  server.close(()=>{
    process.exit(1);
  });
})