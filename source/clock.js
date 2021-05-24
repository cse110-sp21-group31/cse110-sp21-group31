const clockImg = document.getElementById('clock-img');
const clockWindow = document.getElementById('popup');
const closeButton = document.getElementById('close');
const time = document.getElementById('time-selector');
const startTime = document.getElementById('start-time');
const endTime = document.getElementById('end-time');

clockImg.addEventListener('click', ()=> {
    clockWindow.style.display = 'block';
});

closeButton.addEventListener('click', ()=> {
    clockWindow.style.display = 'none';
});
