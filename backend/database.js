const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.LOCAL_MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con =>{
        console.log(`Connected to database with HOST: ${con.connection.host}`);
    });
}
module.exports = connectDatabase;