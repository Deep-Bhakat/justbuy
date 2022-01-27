const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const connectDatabase = require('./database');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');

const errorHandlerMiddleware = require('./middleware/errorHandler');
const app = express()

//setting up config file
dotenv.config({path:'config/config.env'});

//connecting to database
connectDatabase();
//for json
app.use(express.json());
//for cookies
app.use(cookieParser());
//setting the routes
app.use('/api',productRoutes);
app.use('/api',userRoutes);
app.use('/api',orderRoutes);

//setting up error handling
app.use(errorHandlerMiddleware);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Started server at PORT ${process.env.PORT}`);
});


//handle unhandled promise rejection
process.on('unhandledRejection', err =>{
    console.log(`Error : ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(()=>{
        process.exit(1);
    });
})
