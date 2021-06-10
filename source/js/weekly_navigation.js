import { getDaysData } from './storage.js';
import { getDaysKey, getWeek, getName } from './date.js';

/* date variables */
window.curDate = new Date();

/* access log components */
const taskArea = document.getElementById('log-tasks-area');
const eventArea = document.getElementById('log-events-area');
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
// function removeAll() {
//     const taskChildren = taskArea.childNodes;
//     const taskLength = taskChildren.length;
//     for (let i = 0; i < taskLength; i += 1) {
//         taskArea.removeChild(taskArea.lastChild);
//     }
//
//     const eveChildren = eventArea.childNodes;
//     const eveLength = eveChildren.length;
//     for (let i = 0; i < eveLength; i += 1) {
//         eventArea.removeChild(eventArea.lastChild);
//     }
// }

// this function is here just as a reference
// so i can use it in populate()
// the function content is at the bottom of the file
let sideBarClick = function sideBarClickedTemp() {};

function goToDailyLog(key) {
    window.location.href = `daily_log.html?day=${key}`;
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

    // start
    const log = getDaysData(key);
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
        // update its date text
        const tempKey = getDaysKey(window.curDate);

        // linter wont let me put this in one line >:(
        const x = getName(tempKey).split(',')[1];
        days[i].innerText = x;

        window.curDate.setDate(window.curDate.getDate() + 1);

        // set onclick for div outside
        const divOutside = document.getElementById(
            `cal-${days[i].getAttribute('id')}`
        );
        divOutside.setAttribute('data-key', tempKey);

        divOutside.onclick = function onClickText() {
            goToDailyLog(this.getAttribute('data-key'));
        };
    }

    // Reset curDate to beginning of week
    window.curDate.setDate(window.curDate.getDate() - 7);
    // removeAll();

    const allTasks = log.tasks;
    const allEve = log.events;

    allTasks.forEach((task) => {
        const newTask = document.createElement('task-log');
        newTask.content = task;
        taskArea.appendChild(newTask);
    });

    allEve.forEach((event) => {
        const newEvent = document.createElement('event-log');
        newEvent.content = event;
        eventArea.appendChild(newEvent);
    });

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
