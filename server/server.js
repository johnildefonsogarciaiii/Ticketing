const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Handling Uncaught Exeption
process.on('uncaughtException', err => {
    console.log('uncaught Exeption. Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})

dotenv.config({path: './config.env'});
const app = require('./index');


const DB = process.env.DATABASE

//Connecting to MongoDB
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connections successful');
});


//Port
const port = 5000 || process.env.PORT


//Listening to server!
const server = app.listen(port, () => {
    console.log(`Server is up at ${port}`);
})




//Handling if DB not connected
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('Unhandled Rejection. Shutting down...');
    server.close(() => {
        process.exit(1)
    })
})
