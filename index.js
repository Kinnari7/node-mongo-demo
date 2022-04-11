const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./modules')
// Initialize app
const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost:27017/Temp', { useNewUrlParser: true });
var db = mongoose.connection;
if (!db)
    console.log("Error connecting db");
else
    console.log("Db connected successfully");
    
var port = 8000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
app.use(routes)

// Launch app to listen to specified port 
app.listen(port, function () {
    console.log("Running project on port " + port);
});
