// function triggered by eventListener (button click), takes user input and checks user input
export function handleSubmit(event) {
    event.preventDefault()
    let destinationCity = document.getElementById('city').value // save user input 
    let date = document.getElementById('departure').value;
    const rg = new RegExp(/^(?!\s*$).+/);                       // regex for non-empty string 
    if (rg.test(destinationCity) && rg.test(date)){             // check entered data non-empty
        const data = {
            city: destinationCity,
            departure: date
        }
        // function to post request to the server
        getInfoTrip('http://localhost:8080/trip', data)
        .then(function(res) {
            // If error occured, display error message
            if (res.success == false){
                alert("ERROR fetching data. Check if your input is correct")
            }
            // else, according to server response and data received from user, update User Interface 
            else {
                Client.updateUI(res, data);
            }
        })
    }
    else {
        alert("ERROR! Please !! Enter the city and departure date")
    }
};

// function to post request to the server
const getInfoTrip = async (url = '', data = {})=>{
    const response = await fetch(url, {
        credentials: 'same-origin',
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(data),
    });
    try {
        const info = await response.json();
        return info;
    } catch(error) {
        console.log("error !!!!!!!!!", error);
    }
}