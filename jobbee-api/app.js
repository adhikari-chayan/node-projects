const express = require('express');
const app = express();

const dotenv = require('dotenv');

const connectDatabase = require('./config/database');
const errorMiddleware = require('./middlewares/errors');
const ErrorHandler = require('./utils/errorHandler');

//Setting up config.env file variables
dotenv.config({path:'./config/config.env'});

//Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to unhandled exception.');
    process.exit(1);
});

//Connecting to database
connectDatabase();

//Setup body parser
app.use(express.json());

//Creating own middleware
const middleware = (req, res, next) => {
    console.log('Hello from middleware.');
    
    //Setting up user variable globally
    req.user = 'Chayan Adhikari';
    req.requestMethod = req.method;
    next();
}

app.use(middleware);

//Importing all routes
const jobs = require('./routes/jobs'); 

app.use('/api/v1', jobs);

//Handling unhandled routes | * represents all routes and this entry should be below all route definitions
app.all('*', (req, res, next)=>{
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

//Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT,()=>{
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})


//Handling unhandled promise rejection
// Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). 
// Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err =>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to unhandled promise rejection.');
    server.close(()=>{
        process.exit(1);
    })
});