import _ from 'lodash';

const SERIAL_NUMBER = 'IG30417300003680'

const button = document.querySelector('.js-button')
const wrapper = document.querySelector('.js-content')
const send  = document.querySelector('.js-send-button')

button.addEventListener('click', () => {
    navigator.usb.requestDevice({
        filters: [
            {
                vendorId: 0x0411
            }
        ]
    }).then(device => {
        console.log(device.serialNumber)
        console.log(device.productName)
        console.log(device.manufactureName)

        if(device.serialNumber === SERIAL_NUMBER) {
            wrapper.setAttribute('data-show', 'true')
        }
    }).catch(error => { console.log(error) })
})


// firebase
const database = firebase.database()

send.addEventListener('click', () => {
    const text = document.querySelector('.js-text-data').value;
    console.log(text)
    database.ref('chat').push({ 'post' : text })
})

database.ref('chat').on('value', (snapshot) => {
    const text = JSON.stringify(Object.values(snapshot.val()))
    document.querySelector('.js-textarea').innerHTML = text
});