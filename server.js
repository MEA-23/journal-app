//creat empty object to hold all the data as a main container 
projectData = {};

// Require Express to run server and routes, set express to variable 

let express = require('express');

let app = express();

//require cors

let cors = require('cors');

//require bodyParser

let bodyParser = require('body-parser');

//use cors

app.use(cors());

//create port

let port = 8080;

//use body parser to creat the middle wear 

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Initialize the main project folder

app.use(express.static('website'));

// Setup Server, running the server

let server = app.listen(port, listening => {

    console.log('server running');

    console.log(`running on localhost:${port}`);
})

;

// get data from the app , receive post requests and save data 

app.post('/addData', addData);

//get the main data, add it to our object projectData

function addData(req, res) {

    projectData.temperature = req.body.temperature;

    projectData.zipCode = req.body.zipCode;

    projectData.feeling = req.body.feeling;

    projectData.time = req.body.time;

    projectData.city = req.body.place;

    projectData.country = req.body.country;

    console.log(projectData);



}

//send data to the app

app.get('/sendData', sendData);

//send the last data that the server received

function sendData(req, res) {

    res.send(projectData);

    console.log(projectData);

}