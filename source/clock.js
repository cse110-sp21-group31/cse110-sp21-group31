// Popup for the clock button
document.addEventListener('DOMContentLoaded', () => {
    const clockImg = document.getElementById('clock-img');
    const submitButton = document.getElementById('clock-submit-button');
    //const clockWindow = document.getElementById('popup-clock');
    //const startTime = document.getElementById('start-time');
    //const endTime = document.getElementById('end-time');

    function toggle(elementID, displayType) {
        let element = document.getElementById(elementID); 
        if(element.style.display === displayType) {
            element.style.display = 'none';
        } else {
            element.style.display = displayType;
        }
    }

    clockImg.addEventListener('click', () => { toggle('popup-clock', 'flex'); });
    
    submitButton.addEventListener('click', () => { toggle('popup-clock', 'flex'); });
});


