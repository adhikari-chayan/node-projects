const express = require('express');
const app = express();

const dotenv = require('dotenv');

const connectDatabase = require('./config/database');

//Setting up config.env file variables
dotenv.config({path:'./config/config.env'});

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


app.use('/api/v1',jobs);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})