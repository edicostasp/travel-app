var path = require('path');
var bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
let trip = {};

// Start up an instance of app
const app = express()

// initialize main project folder
app.use(express.static('dist'))

//Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Set up server: designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// set dotenv to get API keys from .env
const dotenv = require('dotenv');
dotenv.config();
//________________________________________________________________________________________________________________________________________
// FUNCTIONS
// Function that sends a request to Geonames API to fetch country based on city

const getCountryName = async (geonamesUserKey) => {
    const response = await fetch(`http://api.geonames.org/searchJSON?username=${geonamesUserKey}&q=${trip.city}&maxRows=1`);
    try {
        const data = await response.json();
        trip.country = data.geonames[0].countryName;
    } catch (error) {
        trip.country = "oh oh, Not sure if this country exist, please try again!!!";
        cosole.log("error");
    }
}
//________________________________________________________________________________________________________________________________________
// Function that sends a request to Pixabay server using pixbayApiKey (Pixabay API key)

const getPixBay = async (pixbayApiKey) => {
    const response = await fetch(`https://pixabay.com/api/?image_type=photo&key=${pixbayApiKey}&q=${trip.city}`);
    try {
        const data = await response.json();
        trip.imgURL = data.hits[0].webformatURL;
    } catch (error) {
        trip.imgURL = img('../client/media/fernando-de-noronha-1024x680.jpg');
    }
}

//________________________________________________________________________________________________________________________________________
// Function that sends a request to Pixabay server using pixbayApiKey (Pixabay API key)

const getWeatherBit = async (weatherBitsKey, url) => {
    const response = await fetch(`${url}&key=${weatherBitsKey}&units=M&city=${trip.city},${trip.country}`);
    try {
        const data = await response.json();
        
        if (trip.diffDays >= 0 && trip.diffDays < 16){
            trip.tempMin = data.data[trip.diffDays].low_temp;
            trip.tempMax = data.data[trip.diffDays].high_temp;
            trip.icon = data.data[trip.diffDays].weather.icon;
            trip.weatherDescription = data.data[trip.diffDays].weather.description
            }
        else {
            trip.tempMin = data.data[0].min_temp;
            trip.tempMax = data.data[0].max_temp;           
        }

    } catch (error) {
        trip.weather = "error";
    }
}

//________________________________________________________________________________________________________________________________________
// function calculates amount of days between today and the departure date and generates message

function departureInfo(date) {
    const hoje = new Date();
    const departure = new Date(date);
    const gapTime = Math.abs(departure - hoje);
    const diffDays = Math.ceil(gapTime / (1000 * 60 * 60 * 24)); 
    trip.diffDays = diffDays;

    const GapDaysManual = departure.getDate() - hoje.getDate();
    const diffYears = departure.getFullYear() - hoje.getFullYear();
    const gapMonths = ((departure.getMonth() + 1) - (hoje.getMonth() + 1));


    if (GapDaysManual == 0 && diffYears == 0 && gapMonths == 0){
        trip.departureInfo = `Your Departure is today ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
        trip.diffDays = 0;
    }
    else if (GapDaysManual == -1 && diffYears == 0 && gapMonths == 0){
        trip.departureInfo = `Your Departure was yesterday ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
        trip.diffDays *= -1;
    }
    else if (GapDaysManual == 1 && diffYears == 0 && gapMonths == 0){
        trip.departureInfo = `Your Departure is tomorrow ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
    }
    else if ((departure - hoje) > 0){
        trip.departureInfo = `Your Departure is in ${diffDays} days on ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
    }
    else{
        trip.departureInfo = `Your Departure was ${diffDays} days ago on ${departure.getDate()}.${(departure.getMonth() + 1)}.${departure.getFullYear()}`;
        trip.diffDays *= -1;
    }
}

// ENDPOINTS

// endpoint to get main page
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

function getUrlWeatherbit(diffDays, userInputDate){
    // This function change date format for YY MM DD data extraction
    const departure = new Date(userInputDate);
    
    let url = "";
    // for past dates use received date
    if (diffDays < 0 ){
        let tripStartDate = `${departure.getFullYear()}-${departure.getMonth() + 1}-${departure.getDate()}`;
        let tripEndDate =  `${departure.getFullYear()}-${departure.getMonth() + 1}-${departure.getDate() + 1}`;
        url = `http://api.weatherbit.io/v2.0/history/daily?start_date=${tripStartDate}&end_date=${tripEndDate}`;
    }
    
    // In case of future dates consider historical values from 2019
    else if (diffDays > 15){
        let tripStartDate = `2019-${departure.getMonth() + 1}-${departure.getDate()}`;
        let tripEndDate =  `2019-${departure.getMonth() + 1}-${departure.getDate() + 1}`;
        url = `http://api.weatherbit.io/v2.0/history/daily?start_date=${tripStartDate}&end_date=${tripEndDate}`;
    }
    // just in case, for 16days forcast use different url (here we get icons)
    else {
        url = `http://api.weatherbit.io/v2.0/forecast/daily?`;
    }
    return url;
}

app.post('/trip', async(req, res) => {
    // reset current trip
    trip = {};
    try {
        trip.city = req.body.city;
        let departDate = req.body.departure;
        // function that updates trip.diffDays (days to the trip) 
        // and trip.message (to updat UI with)
        departureInfo(departDate);
        // get base URL for Weaterbit API request
        let url = getUrlWeatherbit(trip.diffDays, departDate);
        await getPixBay(process.env.PIXABAY_API_KEY);
        await getCountryName(process.env.GEONAMES_USER_KEY);
        await getWeatherBit(process.env.WEATHERBIT_API_KEY, url);
        res.json({
            success: true, 
            trip: trip
        });
    } catch (error) {
        res.send({success: false});
    }
     
})

module.exports = app