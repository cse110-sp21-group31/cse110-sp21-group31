import { getDaysKey, getData, getName } from './storage';

/* date variables */
let curDate = new Date();
const newDate = curDate;

/* access log components */
const taskArea = document.getElementById('log-tasks-area');
const eventArea = document.getElementById('log-events-area');
const forward = document.getElementById('right-arrow');
const backward = document.getElementById('left-arrow');

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

/**
 * Changes the date title, removes existing content, populates page with current date's content
 * @param {object} log - The object that contains attributes of the day's journal
 * @param {string} key - The date of the journal
 */
function populate(log, key) {
    document.getElementsByTagName('h3')[0].innerText = getName(key);

    removeAll();

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

    data.media.forEach((item) => {
        let x;
        if (isLinkImage(item)) {
            x = 'img';
        } else {
            x = 'audio';
        }
        x = document.createElement(x);
        x.src = item;
        mediaDOM.appendChild(x);
    });
}

/**
 * Increases date by one day, calls populate
 * @listens forward#click
 */
forward.addEventListener('click', () => {
    newDate.setDate(newDate.getDate() + 1);
    curDate = newDate;
    const key = getDaysKey(newDate);

    populate(getData(key), newDate);
});

/**
 * Decreases the date by one day, calls populate
 * @listens backward#click
 */
backward.addEventListener('click', () => {
    newDate.setDate(newDate.getDate() - 1);
    curDate = newDate;
    const key = getDaysKey(newDate);

    populate(getData(key), newDate);
});

/**
 * When the initial document is loaded, call populate on today's journal content
 * @listens document#DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const key = getDaysKey(curDate);
    populate(getData(key), curDate);
});
