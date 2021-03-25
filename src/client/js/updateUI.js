export const updateUI = (trip, data) => {
    // clean elements created 
    // (default = empty div in html)
    let element = document.getElementById('forecastDetails');
    if (element != null){
        element.remove();
    }

    document.getElementById('banner').style.display = "none"; // remove banner 
    document.getElementById('section2').style.display = "flex"; // display trip card
    document.getElementById("destCity").innerHTML = data.city + ", "; // update card fields: title (city and country)
    document.getElementById("destCountry").innerHTML = trip.trip.country;
    document.getElementById('outputImg2').src = trip.trip.imgURL; // img
    document.getElementById("departInfo").innerHTML = trip.trip.departureInfo; //time to departure

    // update weather forecast: temperature.
    let temp = `The Weather is going to be between ${trip.trip.tempMin} - ${trip.trip.tempMax} °C`
    document.getElementById("dayTemp").innerHTML = temp;

    // updates weather forecast: icon + details. Applies only for 16 days
    if (trip.trip.diffDays >=0 && trip.trip.diffDays < 16){
        let div = document.createElement('div');    // create <div> element
        div.setAttribute('id', 'forecastDetails');
        
        let img = document.createElement('img');
        img.setAttribute('id', 'weather_icon');
        
        let p = document.createElement('p');        // create sub elements and fill with info (weather description, icon)
        p.textContent = trip.trip.weatherDescription;
        p.setAttribute('id', 'day_desc');
        
        let iconSrc = `https://www.weatherbit.io/static/img/icons/${trip.trip.icon}.png`;
        img.src = iconSrc;

        div.appendChild(img);       // append <p> <img> to the div
        div.appendChild(p);         // append <p> <img> to the div

        document.querySelector('#forecast').appendChild(div);   // append <div> to the dome
    }
}