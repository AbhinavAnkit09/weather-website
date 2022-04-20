console.log('Client side js file is loaded')



// fetch('http://localhost:3000/weather?address=patna').then( (response) => {
//     response.json().then( (data) => {
//         if(data.error) {
//             console.log(data.error) 
//         }
//         else {
//             console.log('location: ',data.location)
//             console.log('Forecast:',data.Forecast)
//         }

//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    //console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then( (response) => {
    response.json().then( (data) => {
        if(data.error) {
            // console.log(data.error) 
            messageOne.textContent ='Error: '+data.error
            messageTwo.textContent =''
        }
        else {
            // console.log('location: ',data.location)
            // console.log('Forecast:',data.Forecast)
            messageOne.textContent = 'Location: ' +data.location
            messageTwo.textContent = 'Current weather: '+ data.Forecast
        }

    })
    })


})


