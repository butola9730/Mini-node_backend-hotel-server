 const mongoose = require('mongoose');

 //Define the MongoDB connection URL
const mongoURL = 'mongodb://Shubham:butola9730@127.0.0.1:27017/admin'; //Replace 'Mydatabase' with your databasename

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;


//Define the event listeners for database connection

 db.on('connected', ()=>{
    console.log('Connected to MongoDB Server')
 });

 db.on('error',(err)=>{
    console.log('MongoDB connection Error', err);
 });

 db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
 });


 //Export the database connection
 module.exports = db;