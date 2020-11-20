//Client side javascript
console.log('Client side javascript file is loaded')

// to catch search text
const weatherForm = document.querySelector('form')

// extract data value from input
const search = document.querySelector('input')

// print in the frontend
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    // para o browser nao fazer reload da pagina!
    event.preventDefault()

    const location = search.value
    //console.log(location)

    // Set text
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //fetch api is not part of javascript, it is a browser based API
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then( (response) => {
        // data is the json that is sent from the server side
        /**
         * data = {
         * forecast: forecastData,
         * location,
         * address: req.query.address
         * }
         */
        response.json().then( (data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error;
            } else {
                //console.log(data.location)
                //console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})