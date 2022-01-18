const express = require('express')
const dotenv = require('dotenv')
const connectDatabase = require('./database');
const productRoutes = require('./routes/productRoute');
const app = express()

//setting up config file
dotenv.config({path:'config/config.env'});

//connecting to database
connectDatabase();
//for json
app.use(express.json());
//setting the routes
app.use('/api',productRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Started server at PORT ${process.env.PORT}`);
});