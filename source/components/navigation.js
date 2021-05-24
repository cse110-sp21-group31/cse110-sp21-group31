
import { getDaysKey } from './storage.js';

/* date variables */
let curDate = new Date();
let changeDate = curDate;

/* access log components */
const taskArea = document.getElementById('log-tasks-area');
const eventArea = document.getElementById('log-events-area');
const forward = document.getElementById('right-arrow');
const backward = document.getElementById('left-arrow');

/* day key to access individual log */
let key;

/* Increases date by one, gets data, calls populate */
forward.addEventListener('click', () => {
    /* gets tomorrow date key */
    changeDate.setDate(curDate.getDate() - 1);
    curDate = changeDate;
    key = getDaysKey(changeDate);

    populate(getData(key));

});

/* Decreases date by one, gets data, calls populate */
backward.addEventListener('click', () => {
    /* gets yesterday date key */
    changeDate.setDate(curDate.getDate() - 1);
    curDate = changeDate;
    key = getDaysKey(changeDate);

    populate(getData(key), key);

});

function populate(item, key) {

    /* Sets new date at the top */
    document.querySelector('date-text').innerHTML = getName(key);

    /* remove current data and repopulate with new data shit idk how to remove*/
    const allTasks = item["tasks"];
    const allEve = item["events"];

    /* populate middle log with tasks */
    allTasks.forEach((task) => {
        let newTask = document.createElement('task-log');
        newTask.content = task;
        taskArea.appendChild(newTask);
    });
    
    /* populate middle log with events */
    allEve.forEach((event) => {
        let newEvent = document.createElement('event-log');
        newEvent.content = event;
        eventArea.appendChild(newEvent);
    });
    
    /* populate media and notepad */
}

document.addEventListener('load', () => {

    let item = getData(curDate);
    /* populate with current data */
    populate(item);

});