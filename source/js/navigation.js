import { getDaysData } from './storage.js';
import { getDaysKey, getWeek, getName } from './date.js';

/* date variables */
window.curDate = new Date();
const possibleImageSubscripts = ['.jpg', '.png'];

/* access log components */
const taskArea = document.getElementById('log-tasks-area');
const eventArea = document.getElementById('log-events-area');
const noteArea = document.getElementById('notes-text-area');
const mediaArea = document.getElementById('media-text-area');
const forward = document.getElementById('right-arrow');
const backward = document.getElementById('left-arrow');
const sideBar = document.querySelector('#mySideBar ul');

/**
 * Removes the current content from the log, notepad, and media tab
 */
function removeAll() {
    const taskChildren = taskArea.childNodes;
    const taskLength = taskChildren.length;
    for (let i = 0; i < taskLength; i += 1) {
        taskArea.removeChild(taskArea.lastChild);
    }

    const eveChildren = eventArea.childNodes;
    const eveLength = eveChildren.length;
    for (let i = 0; i < eveLength; i += 1) {
        eventArea.removeChild(eventArea.lastChild);
    }

    const mediaChildren = mediaArea.childNodes;
    const mediaLength = mediaChildren.length;
    for (let i = 0; i < mediaLength; i += 1) {
        mediaArea.removeChild(mediaArea.lastChild);
    }

    const noteChildren = noteArea.childNodes;
    const noteLength = noteChildren.length;
    for (let i = 0; i < noteLength; i += 1) {
        noteArea.removeChild(noteArea.lastChild);
    }

    const sideBarLength = sideBar.childNodes.length;
    for (let i = 0; i < sideBarLength; i += 1)
        sideBar.removeChild(sideBar.lastChild);
}

/**
 * Identify if the given string contains image subscripts
 * @param {string} link
 * @return true/false
 */
function isLinkImage(link) {
    let bool = false;
    const subscript = link.slice(link.lastIndexOf('.'));
    possibleImageSubscripts.forEach((item) => {
        if (subscript === item) {
            bool = true;
        }
    });
    return bool;
}

// this function is here just as a reference
// so i can use it in populate()
// the function content is at the bottom of the file
let sideBarClick = function sideBarClickedTemp() {};

/**
 * Changes the date title, removes existing content, populates page with current date's content
 * @param {string} key - The date of the journal
 */
function populate(key) {
    const log = getDaysData(key);

    document.getElementsByTagName('h3')[0].innerText = log.name;

    removeAll();

    const allTasks = log.tasks;
    const allEve = log.events;
    const allMedia = log.media;

    noteArea.innerText = log.notepad;

    allTasks.forEach((task) => {
        const newTask = document.createElement('task-log');
        newTask.content = task;
        taskArea.appendChild(newTask);
    });

    allMedia.forEach((item) => {
        let x;
        if (isLinkImage(item)) {
            x = 'img';
        } else {
            x = 'audio';
        }
        x = document.createElement(x);
        x.src = item;
        mediaArea.appendChild(x);
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
    window.curDate.setDate(window.curDate.getDate() + 1);
    const key = getDaysKey(window.curDate);

    setState(key);
});

/**
 * Decreases the date by one day, calls populate
 * @listens backward#click
 */
backward.addEventListener('click', (event) => {
    event.preventDefault();
    window.curDate.setDate(window.curDate.getDate() - 1);
    const key = getDaysKey(window.curDate);

    setState(key);
});

// side bar navigate
sideBarClick = function sideBarClickedActual(event) {
    event.preventDefault();
    setState(this.getAttribute('data-key'));
    document.querySelector('.closebtn').onclick(event);
};

export default setState;
