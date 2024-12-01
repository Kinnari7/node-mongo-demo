const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./modules');
const dotenv = require('dotenv');
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);
// Initialize app
const app = express();

require('events').EventEmitter.defaultMaxListeners = 20;
dotenv.config();
app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect("mongodb://localhost:27017/TrackTheTrail", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Db connected successfully");
}).catch((err) => {
    console.log("Error connecting db", err);
});

var port = 8000;

// Send message for default URL
app.use(routes);

// Launch app to listen to specified port 
app.listen(port, function () {
    console.log("Running project on port " + port);
});
