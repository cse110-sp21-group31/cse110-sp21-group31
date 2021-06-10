import { getDaysData } from './storage.js';
import { getDaysKey, getWeek, getName } from './date.js';

/* date variables */
window.curDate = new Date();

/* access log components */
// const noteArea = document.getElementById('notes-text-area');
// const mediaArea = document.getElementById('media-text-area');
const forward = document.getElementById('right-arrow');
const backward = document.getElementById('left-arrow');
// const sunday = document.getElementById('cal-sun');
// const monday = document.getElementById('cal-mon');
// const tueday = document.getElementById('cal-tues');
// const wednesday = document.getElementById('cal-wed');
// const thursday = document.getElementById('cal-thurs');
// const friday = document.getElementById('cal-fri');
// const saturday = document.getElementById('cal-sat');
const sideBar = document.querySelector('#mySideBar ul');


/** TODO:
 * Removes the current content from the weekly log 
 */
 function removeAll(taskBox, eventBox) {
    // sideBar remover
    const sideBarLen = sideBar.childNodes.length;
    for (let i = 0; i < sideBarLen; i += 1) {
        sideBar.removeChild(sideBar.lastChild);
    }
    // task remover
    const taskBoxLen = taskBox.childNodes.length;
    for (let i = 0; i < taskBoxLen; i += 1) {
        taskBox.removeChild(taskBox.lastChild);
    }
    // event remover /* const eventBox = document.getElementById('cal-sun'); */
    const eventBoxLen = eventBox.querySelectorAll('label').length;
    for (let i = 0; i < eventBoxLen; i += 1) {
       eventBox.querySelector('label').remove();
    }
}

// this function is here just as a reference
// so i can use it in populate()
// the function content is at the bottom of the file
let sideBarClick = function sideBarClickedTemp() {};

function setTasks(allTasks, taskBox) {
    allTasks.forEach((task) => {
        taskBox.append(['—', task.content].join(' '));
        const br = document.createElement('br');
        taskBox.append(br);
    });
}

/**
 * Changes the date title, removes existing content, populates page with current date's content
 * @param {string} key - The date of the journal
 */
function populate(key) {
    // removeAll();
    const name = getName(key);

    const title = [
        'Week of ',
        name.split(',')[1],
        ', ',
        window.curDate.getFullYear(),
    ].join('');

    document.getElementsByTagName('h3')[0].innerText = title;

    // Sets all dates for each day
    const days = document.getElementsByClassName('date');
    for (let i = 0; i < 7; i += 1) {
        // loop through every log
        const tempKey = getDaysKey(window.curDate);
        const log = getDaysData(tempKey);
        const allTasks = log.tasks;
        const allEve = log.events;
        const day = log.name;
    
        window.curDate.setDate(window.curDate.getDate() + 1);
       
        // eslint-disable-next-line prefer-destructuring
        days[i].innerText = getName(tempKey).split(',')[1];
    

        const taskDay = log.name.slice(0, 3).toLowerCase();
        const taskID = ['cal', 'task', taskDay].join('-');
        const taskBox = document.getElementById(taskID);
        const id = `cal-${day.slice(0, 3).toLowerCase()}`;
        const eventBox = document.getElementById(id);

        // clear any existing entries (add var for event container as parameter)
        removeAll(taskBox, eventBox);
        // setting all tasks
        setTasks(allTasks, taskBox);

        for(let j = 0; j < allEve.length; j += 1 ){
            const eventLabel = document.createElement('label');

            // Get start and end times (hours and minutes) of event
            const startTime = allEve[j].from;
            const endTime = allEve[j].to;

            const startTimeHr = startTime.slice(0, startTime.indexOf(':'));
            const startTimeMinutes = startTime.substr(startTime.indexOf(':')+1, 3);
            
            const endTimeHr = endTime.slice(0, endTime.indexOf(':'));
            const endTimeMinutes = endTime.substr(endTime.indexOf(':')+1, 3);
            
            const startTimeAMPM = startTime.slice(-2);
            const endTimeAMPM = endTime.slice(-2);
            
            // Constant attributes
            eventLabel.style.position = 'absolute';
            eventLabel.style.left = 0;
            eventLabel.style.color = 'white';
            eventLabel.style.display = 'flex';
            eventLabel.style.flexDirection = 'row';
            eventLabel.style.width = '100%';
            eventLabel.style.justifyContent = 'center';
            eventLabel.style.alignItems = 'center';
            eventLabel.style.backgroundColor = 'lightpink';
            eventLabel.textContent = allEve[j].content;
            eventLabel.style.border = '1px solid black';
            
            /*
                Use start time to calculate 'top'
            */
            let top = startTimeHr + 10*(startTimeMinutes/60);
            
            // If 12 AM
            if(startTimeHr === '12' && startTimeAMPM === 'AM') {
                top = 10*(startTimeMinutes/60);
                top += '%';
                eventLabel.style.top = top;
            } 
            else if(startTimeAMPM === 'AM') {
                top += '%';
                eventLabel.style.top = top;
            }
            else if(startTimeHr === '12' && startTimeAMPM === 'PM') {
                top = 120 + 10*(startTimeMinutes/60);
                top += '%';
                eventLabel.style.top = top;
            }
            else if(startTimeAMPM === 'PM') {
                top = parseFloat(top) + 120;
                top += '%';
                eventLabel.style.top = top;
            }

            /* 
                Use end time to calculate 'bottom'
                Note: this depends on whether event ends before or after 10 am
                less than  10 and AM:
            */
            let bottom;
            if(endTimeHr < 10 && endTimeAMPM === 'AM') { 
                bottom = 10*(10-endTimeHr) - 10*(endTimeMinutes/60);
                bottom += '%';
                eventLabel.style.bottom = bottom; 
            } else if(endTimeHr >= 10 && endTimeAMPM === 'AM') {
                bottom = 10*endTimeHr%10 + 10*(endTimeMinutes/60);
                bottom = `-${bottom}%`; 
                eventLabel.style.bottom = bottom; 
            } else if(endTimeHr === 12 && endTimeAMPM === 'PM') {
                bottom = 20 + 10*(endTimeMinutes/60);
                bottom = `-${bottom}%`;
                eventLabel.style.bottom = bottom; 
            } else {
                bottom = 20 + 10*(endTimeHr) + 10*(endTimeMinutes/60);
                bottom = `-${bottom}%`;
                eventLabel.style.bottom = bottom;
            }
            
            eventBox.appendChild(eventLabel);
        }

    }

    // Reset curDate to beginning of week
    window.curDate.setDate(window.curDate.getDate() - 7);


    // allTasks.forEach((task) => {
    //     const newTask = document.createElement('task-log');
    //     newTask.content = task;
    //     taskArea.appendChild(newTask);
    // });

    // allEve.forEach((event) => {
    //     const newEvent = document.createElement('event-log');
    //     newEvent.content = event;      
    //     // eventArea.appendChild(newEvent);
    // });

    // update the sidebar
    const allDays = getWeek();
    for (let i = 0; i < 7; i += 1) {
        const newDayLink = document.createElement('a');
       newDayLink.innerText = getName(allDays[i]);
        newDayLink.setAttribute('href', '#');
        newDayLink.setAttribute('data-key', allDays[i]);
        newDayLink.onclick = sideBarClick;
        sideBar.appendChild(newDayLink);
    }
}

// router code put here to prevent dependency cycle

function setState(dateKey, newState = true) {
    if (newState) {
        window.history.pushState({ key: dateKey }, '', `#${dateKey}`);
    }
    window.curDate = new Date(`${dateKey}T00:00:00`);
    populate(dateKey);
}

function popState(event) {
    if (event.state != null) setState(event.state.key, false);
}
window.onpopstate = popState;

/**
 * Increases date by one day, calls populate
 * @listens forward#click
 */
forward.addEventListener('click', (event) => {
    event.preventDefault();

    window.curDate.setDate(window.curDate.getDate() + 7);
    const key = getDaysKey(window.curDate);

    setState(key);
});

/**
 * Decreases the date by one day, calls populate
 * @listens backward#click
 */
backward.addEventListener('click', (event) => {
    event.preventDefault();

    window.curDate.setDate(window.curDate.getDate() - 7);
    const key = getDaysKey(window.curDate);

    setState(key);
});

/**
 * When the initial document is loaded, call populate on today's journal content
 * @listens document#DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // set the current state
    // window.localStorage.clear();
    if (window.curDate.getDay() !== 0) {
        window.curDate.setDate(
            window.curDate.getDate() - window.curDate.getDay()
        );
    }
    const key = getDaysKey(window.curDate);
    setState(key);
});

// side bar navigate
// .forEach replaced to satisfy linter

sideBarClick = function sideBarClickActual(event) {
    event.preventDefault();
    setState(getDaysKey(new Date(this.innerText)));
    document.querySelector('.closebtn').onclick(event);
}

const arr = document.querySelectorAll('#mySidebar small a');
for (let i = 0; i < arr.length; i += 1) {
    arr[i].onclick = sideBarClick;
}
