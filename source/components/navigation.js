<<<<<<< HEAD
import { getDaysKey, getData, getName } from './storage';

/* date variables */
let curDate = new Date();
const newDate = curDate;
const possibleImageSubscripts = ['.jpg', '.png'];
=======

import { getDaysKey, getData, getName } from './storage.js';

/* date variables */
let curDate = new Date();
let newDate = curDate;
>>>>>>> 2442e17 (Fixed event listeners and populate)

/* access log components */
const taskArea = document.getElementById('log-tasks-area');
const eventArea = document.getElementById('log-events-area');
const noteArea = document.getElementById('notes-text-area');
const mediaArea = document.getElementById('media-text-area');
const forward = document.getElementById('right-arrow');
const backward = document.getElementById('left-arrow');

<<<<<<< HEAD
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
=======
/* Increases date by one, gets data, calls populate */
forward.addEventListener('click', () => {
    /* gets tomorrow date key */
    newDate.setDate(newDate.getDate() + 1);
    curDate = newDate;
    let key = getDaysKey(newDate);

    populate(getData(key), newDate);

});

/* Decreases date by one, gets data, calls populate */
backward.addEventListener('click', () => {
    /* gets yesterday date key */
    newDate.setDate(newDate.getDate() - 1);
    curDate = newDate;
    let key = getDaysKey(newDate);

    populate(getData(key), newDate);

});
>>>>>>> 2442e17 (Fixed event listeners and populate)

<<<<<<< HEAD
    removeAll();
=======
function remove() {
    
    let taskChildren = taskArea.childNodes;
    taskChildren.forEach((child) => {
        child.remove();
    });

    let eveChildren = eventArea.childNodes;
    eveChildren.forEach((child) => {
        child.remove();
    });

    /* remove media and notepad */

}

function populate(item, key) {
>>>>>>> 260775d (Added remove function, removed task labels to test)

<<<<<<< HEAD
    const allTasks = log.tasks;
    const allEve = log.events;
    const allMedia = log.media;
=======
    /* Sets new date at the top */
<<<<<<< HEAD
    let i = document.getElementsByTagName('h3')[0].innerText = getName(key);
>>>>>>> 2442e17 (Fixed event listeners and populate)
=======
    document.getElementsByTagName('h3')[0].innerText = getName(key);
>>>>>>> 9ae140b (Fixed date misalignment, added dummy item)

<<<<<<< HEAD
    noteArea.append(log.notepad);
=======
    /* remove current data and repopulate with new data shit idk how to remove*/
    remove();

    const allTasks = item["tasks"];
    const allEve = item["events"];
>>>>>>> 260775d (Added remove function, removed task labels to test)

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
}

<<<<<<< HEAD
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
=======
document.addEventListener('DOMContentLoaded' , () => {

    let item = {
        name: "Monday, May 24th",
        notepad: "blan blah blah",
        tasks: [
            {
                content: "Go on a run",
                completed: true/false,
                tags: ["Other", "UCSD"],
            }
        ],
        events: [
            {
                content: "CSE 110 Lecture",
                tags: "Lecture",
                from: 1621308663,
                to: 1621367364,
            },
        ]
    }
    //let item = getData(curDate);
    /* populate with current data */
    populate(item, curDate);
>>>>>>> 2442e17 (Fixed event listeners and populate)

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
