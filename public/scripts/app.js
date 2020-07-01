const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const icon = document.querySelector('#icon');
const myLocation = document.querySelector('#my-location');

const disableInput = () => {
    search.setAttribute('disabled', 'disabled');
    weatherForm.querySelector('button').setAttribute('disabled', 'disabled');
    myLocation.setAttribute('disabled', 'disabled');
    messageOne.textContent  = '';
    messageTwo.textContent  = '';
    icon.src='';
}
const enableInput = () => {
    search.removeAttribute('disabled');
    weatherForm.querySelector('button').removeAttribute('disabled');
    myLocation.removeAttribute('disabled');
    search.focus();
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    disableInput();
    let location = search.value;
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent  = data.error;
                messageTwo.textContent  = '';
                icon.src='';
            } else {
                messageOne.textContent  = data.location;
                messageTwo.innerText  = data.description+'\n'+
                                    data.degree+'\n'+
                                    data.humidity+'\n'+
                                    data.uv_index;
                icon.src = data.icon;
            }
            enableInput();
        });
    });
});

myLocation.addEventListener('click', (e) => {
    e.preventDefault();
    search.value = '';
    disableInput();
    if (!navigator.geolocation) { // mdn geolocation
        enableInput();
        messageOne.textContent  = 'Geolocation is not supported by your browser'
    }
    navigator.geolocation.getCurrentPosition((position) => {
        fetch(`/my-location?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`).then((response) => response.json()).then((data) => {
            if (data.error){
                messageOne.textContent  = data.error;
                messageTwo.textContent  = '';
                icon.src='';
            } else {
                messageOne.textContent  = data.location;
                messageTwo.innerText  = data.description+'\n'+
                                    data.degree+'\n'+
                                    data.humidity+'\n'+
                                    data.uv_index;
                icon.src = data.icon;
            }
            enableInput();
        });
    }, (error) => {
        enableInput();
        messageOne.textContent = error.message;
    });
});