const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const icon = document.querySelector('#icon');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent  = data.error;
                messageTwo.textContent  = '';
                icon.src='';
            }else {
                messageOne.textContent  = data.location;
                messageTwo.textContent  = data.forecast;
                icon.src = data.icon;

            }
        });
    });
});