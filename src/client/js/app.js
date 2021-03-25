// function triggered by eventListener (button click), takes user input and checks user input
export function handleSubmit(event) {
    event.preventDefault()

    // save user input 
    let destinationCity = document.getElementById('city').value
    let date = document.getElementById('departure').value;
    
    // regex for non-empty string
    const rg = new RegExp(/^(?!\s*$).+/);

    // check entered data non-empty 
    if (rg.test(destinationCity) && rg.test(date)){
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
            // else update UI according to server response and data received from user
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
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error !!!!!!!!!", error);
    }
}
