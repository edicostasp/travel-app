# UDACITY - Travel Planner App - Final Project
This project is part of [Udacity](https://www.udacity.com/) Front End Developer Nanodegree program.

## Objective
The goal of the project is to build a travel app which receive the desired trip location & date from the user, and displays weather forecast and a image of the city using information obtained from external APIs.

## Tech stack
1. HTML
2. Sass
3. JavaScript
4. Node.js
5. Webpack

## How to run the project
* Sign up and get API keys from [Weatherbit](https://www.weatherbit.io/account/create), [Pixabay](https://pixabay.com/api/docs/) and user name from [GeoNames](http://www.geonames.org/export/web-services.html)
* git clone the repository

## .Env file

You will need to create the '.env' file and enter your own API credentials

  ```
  PIXABAY_API_KEY=**************************
  GEONAMES_USER_KEY=**************************
  WEATHERBIT_API_KEY=**************************
  ```
* Install npm by running ```npm install```
* To run in develoment mode run ```npm run build-dev```, the window will open automatically
* To run in production mode run ```npm run build-prod```, then ```npm start``` and open [http://localhost:8080/](http://localhost:8080/) in your browser

Detailed project specifications available [here](https://review.udacity.com/#!/rubrics/2669/view)

## VIEW
App interface for desktop

## Chosen requirement Suggestions 
* Incorporate icons into forecast.