const express = require('express')
const dotenv = require('dotenv')
const connectDatabase = require('./database');
const app = express()

//setting up config file
dotenv.config({path:'config/config.env'});

//connecting to database
connectDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`Started server at PORT ${process.env.PORT}`);
});