// Create a new date instance dynamically with JS
let d = new Date();

//get data with time 

let time = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}  [${d.getHours()}:${d.getMinutes()}]`;

//my API key

const key = 'b46aa047bef64b5058cf54cfe759b55d';

// input data element's containers 

let zipCodeInput = document.getElementById('zipCode');

let feelingInput = document.getElementById('feeling');

// global variables to hold user input

let zipCode;

let feeling;

//unite 

let unite = 'metric';

// output data container

let tempOutC = document.getElementById('tempOut');

let feelingOutC = document.getElementById('feelingOut');

let timeOutC = document.getElementById('timeOuy');

let zipCodeOutC = document.getElementById('zipCodeOut');

let cityOutC = document.getElementById('cityOut');

let countryOutC = document.getElementById('countryOut');

// run button

let generateButton = document.getElementById('generate');

// add event listener to the button to run the performAction on click

generateButton.addEventListener('click', performAction);

// main function to receive user input data

function performAction(e) {

    //add user input to the global variables

    zipCode = zipCodeInput.value;

    feeling = feelingInput.value;

    getTemp(zipCode, key)

        //wait for getTemp func to get data from API then add the data to the server using post request

        .then(function(data) {



            postData('/addData', {
                    temperature: data.main.temp,

                    zipCode: zipCode,
                    feeling: feeling,
                    place: data.name,

                    country: data.sys.country,
                    time: time
                })

                // update the ui after post the data to the server

                .then(

                    updateUI()

                )

        })

}

// get the weather data from mapweather API

const getTemp = async (zipCode, key) => {

    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}&units=${unite}

    `);

    console.log(res);

    try { //turn data to json 

        const data = await res.json();



        console.log(data);



        return data;

    } catch (error) {

        console.log('error', error);

        tempOutC.innerHTML = error;

    }

};

// send data to the server using url which given in the server side code and the data object we got from the API

const postData = async (url = '', data = {}) => {

    const postRequest = await fetch(url, {

        method: 'POST',

        credentials: 'same-origin',

        headers: {

            'Content-Type': 'application/json',

        },

        body: JSON.stringify(data),

    });

    try {



        const newData = await postRequest.json();

        console.log(newData);

        return newData;

    } catch (error) {

        console.log('Error', error);

        tempOutC.innerHTML = error;

    }

};

// undated the ui from the server

const updateUI = async () => {

    const req = await fetch('/sendData');

    try {

        const lastModifiedData = await req.json();



        //data we got from the server

        console.log(lastModifiedData);

        //convert temperature from Kelvin to celsius Rounded to the nearest number


        //add the data we proceed to the data containers in the html file so the user be able to see it

        //add temperature

        let n = lastModifiedData.temperature;

        tempOutC.innerHTML = Math.round(n);



        //add the feeling

        feelingOutC.innerHTML = lastModifiedData.feeling;

        //add the current data and time

        timeOutC.innerHTML = lastModifiedData.time;

        // add the zip code (not active)

        //    zipCodeOutC.innerHTML = lastModifiedData.zipCode;

        //add the city

        cityOutC.innerHTML = lastModifiedData.city;

        //add the country

        countryOutC.innerHTML = lastModifiedData.country;

    } catch (error) {

        console.log('error withe server', error);

        //show error message to the user in the temp container when there is issues whith the server(not active)

        // tempOutC.innerHTML = "error withe server, try later";

    }

};

//show the latest data(last used data) to the user when access the app, it changes depending on the last data the server got

updateUI();