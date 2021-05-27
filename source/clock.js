// Popup for the clock button
document.addEventListener('DOMContentLoaded', () => {
    let clockWindow = document.getElementById('popup-clock');
    let clockImg = document.getElementById('clock-img');
    let submitButton = document.getElementById('submit-button');
    let startTime = document.getElementById('start-time');
    let endTime = document.getElementById('end-time');;

    function toggle(element) {
        if(element.style.display == 'block') {
            element.style.display = 'none';
        } else {
            element.style.display = "block";
        }
    }

    clockImg.addEventListener('click', () => { toggle(clockWindow); });
    
    submitButton.addEventListener('click', () => { toggle(clockWindow); });
});


