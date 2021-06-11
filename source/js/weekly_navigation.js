import { getCustomTagColor, getDaysData } from './storage.js';
import { getDaysKey, getWeek, getName } from './date.js';
import getEventWidths from './components/sortEvents.js';

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

function goToDailyLog(key) {
    window.location.href = `daily_log.html?day=${key}`;
}

function setTasks(allTasks, taskBox) {
    allTasks.forEach((task) => {
        const newTask = document.createElement('div');
        newTask.classList.add('weekly-task-container');
        newTask.innerText = ['—', task.content].join(' ');
        taskBox.append(newTask);
    });
}

/**
 * Changes the date title, removes existing content, populates page with current date's content
 * @param {string} keyT - The date of the journal
 */

function populateW(keyT) {
    // set curDate to the sunday before keyT
    const dateObj = new Date(`${keyT}T00:00:00`);
    dateObj.setDate(dateObj.getDate() - dateObj.getDay());
    window.curDate.setDate(dateObj.getDate());
    const key = getDaysKey(window.curDate);

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

        const day = log.name;

        // get only the events with a from and to time in allEve
        const tempEve = [];
        for (let j = 0; j < log.events.length; j += 1)
            if (log.events[j].from !== '' && log.events[j].to !== '')
                tempEve.push(log.events[j]);
        const allEve = tempEve;

        // get the widths and left percentage
        const eveWidths = getEventWidths(allEve);

        window.curDate.setDate(window.curDate.getDate() + 1);

        // set onclick for div outside
        const divOutside = document.getElementById(
            `cal-${days[i].getAttribute('id')}`
        );
        divOutside.setAttribute('data-key', tempKey);

        divOutside.onclick = function onClickText() {
            goToDailyLog(this.getAttribute('data-key'));
        };

        // set name for thing
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

        for (let j = 0; j < allEve.length; j += 1) {
            const eventLabel = document.createElement('label');

            // Get start and end times (hours and minutes) of event
            const startTime = allEve[j].from;
            const endTime = allEve[j].to;

            const startTimeHr = startTime.slice(0, startTime.indexOf(':'));
            const startTimeMinutes = startTime.substr(
                startTime.indexOf(':') + 1,
                3
            );

            const endTimeHr = endTime.slice(0, endTime.indexOf(':'));
            const endTimeMinutes = endTime.substr(endTime.indexOf(':') + 1, 3);

            const startTimeAMPM = startTime.slice(-2);
            const endTimeAMPM = endTime.slice(-2);

            // Constant attributes
            eventLabel.style.position = 'absolute';
            eventLabel.style.display = 'flex';
            eventLabel.style.flexDirection = 'row';
            eventLabel.style.justifyContent = 'center';
            eventLabel.style.alignItems = 'center';
            eventLabel.textContent = allEve[j].content;
            eventLabel.style.wordBreak = 'break-word';

            // set the widths and left percentages
            eventLabel.style.left = `${eveWidths[j].left}%`;
            eventLabel.style.width = `${eveWidths[j].width}%`;

            // apply tag styling
            let tagsClass = 'no-tag';
            if (allEve[j].tags.length > 0) {
                tagsClass = `${getCustomTagColor(allEve[j].tags[0])}-tag`;
            }
            eventLabel.setAttribute('class', tagsClass);

            /*
                Use start time to calculate 'top'
            */
            let top = startTimeHr + 10 * (startTimeMinutes / 60);

            // If 12 AM
            if (startTimeHr === '12' && startTimeAMPM === 'AM') {
                top = 10 * (startTimeMinutes / 60);
                top += '%';
                eventLabel.style.top = top;
            } else if (startTimeAMPM === 'AM') {
                top += '%';
                eventLabel.style.top = top;
            } else if (startTimeHr === '12' && startTimeAMPM === 'PM') {
                top = 120 + 10 * (startTimeMinutes / 60);
                top += '%';
                eventLabel.style.top = top;
            } else if (startTimeAMPM === 'PM') {
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
            if (endTimeHr < 10 && endTimeAMPM === 'AM') {
                bottom = 10 * (10 - endTimeHr) - 10 * (endTimeMinutes / 60);
                bottom += '%';
                eventLabel.style.bottom = bottom;
            } else if (endTimeHr >= 10 && endTimeAMPM === 'AM') {
                bottom = ((10 * endTimeHr) % 10) + 10 * (endTimeMinutes / 60);
                bottom = `-${bottom}%`;
                eventLabel.style.bottom = bottom;
            } else if (endTimeHr === 12 && endTimeAMPM === 'PM') {
                bottom = 20 + 10 * (endTimeMinutes / 60);
                bottom = `-${bottom}%`;
                eventLabel.style.bottom = bottom;
            } else {
                bottom = 20 + 10 * endTimeHr + 10 * (endTimeMinutes / 60);
                bottom = `-${bottom}%`;
                eventLabel.style.bottom = bottom;
            }

            eventBox.appendChild(eventLabel);
        }
    }

    // Reset curDate to beginning of week
    window.curDate.setDate(window.curDate.getDate() - 7);

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

function setStateW(dateKey, newState = true) {
    // get the new url address...
    // first rid of anything after ? or #
    // then append the dateKey after a #
    let url = window.location.href;
    const indQ = url.indexOf('?');
    if (indQ !== -1) url = url.slice(0, indQ);
    const indH = url.indexOf('#');
    if (indH !== -1) url = url.slice(0, indH);
    url = `${url}#${dateKey}`;

    if (newState) window.history.pushState({ key: dateKey }, '', url);
    else window.history.replaceState({ key: dateKey }, '', url);

    window.curDate = new Date(`${dateKey}T00:00:00`);
    populateW(dateKey);
}

function popState(event) {
    if (event.state != null) setStateW(event.state.key, false);
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

    setStateW(key);
});

/**
 * Decreases the date by one day, calls populate
 * @listens backward#click
 */
backward.addEventListener('click', (event) => {
    event.preventDefault();

    window.curDate.setDate(window.curDate.getDate() - 7);
    const key = getDaysKey(window.curDate);

    setStateW(key);
});

/**
 * When the initial document is loaded, call populate on today's journal content
 * @listens document#DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // the key of the date that we want to load
    let key = '';
    const url = window.location.href;
    const searchStr = '?day=';
    const indexQ = url.indexOf(searchStr);
    const indexH = url.indexOf('#');

    // if the url contians ?day=2021-06-02 (came from weekly log button click)
    if (indexQ !== -1) key = url.slice(indexQ + searchStr.length);
    // if the url contains #2021-06-02 (came from weekly log pressing browser for/back)
    else if (indexH !== -1) key = url.slice(indexH + 1);
    // otherwise go to curDate
    else key = getDaysKey(window.curDate);

    setStateW(key, false);
});

// side bar daily log links
// navigate to daily log
sideBarClick = function sideBarClickActual(event) {
    event.preventDefault();
    goToDailyLog(this.getAttribute('data-key'));
};

const arr = document.querySelectorAll('#mySidebar small a');
for (let i = 0; i < arr.length; i += 1) {
    arr[i].onclick = sideBarClick;
}
