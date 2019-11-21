const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')// to select an id '#example' // to select a class its '.example'
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = `Loading...`
    message2.textContent = ``
    message3.textContent = ``

    


    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                console.log(data.error)
                message1.textContent = `${data.error}`
                message2.textContent = ``
                search.value = ``
            } else {
                console.log(data.location)
                console.log(data.forecast)

                message1.textContent = `${data.location}`
                message2.textContent = `${data.forecast}`
                message3.textContent = `NOTE: Degress are in fahrenheit. Winds are in MPH (miles per hour)`
                search.value = ``

            }
        })
    })

})
