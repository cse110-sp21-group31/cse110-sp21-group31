
import { getDaysKey, getData, getName } from './storage.js';

/* date variables */
let curDate = new Date();
let newDate = curDate;

/* access log components */
const taskArea = document.getElementById('log-tasks-area');
const eventArea = document.getElementById('log-events-area');
const forward = document.getElementById('right-arrow');
const backward = document.getElementById('left-arrow');

/* Increases date by one, gets data, calls populate */
forward.addEventListener('click', () => {
    /* gets tomorrow date key */
    newDate.setDate(newDate.getDate() + 1);
    curDate = newDate;

    populate(getData(key), newDate);

});

/* Decreases date by one, gets data, calls populate */
backward.addEventListener('click', () => {
    /* gets yesterday date key */
    newDate.setDate(newDate.getDate() - 1);
    curDate = newDate;

    populate(getData(key), newDate);
});

function populate(item, key) {

    /* Sets new date at the top */
    let i = document.getElementsByTagName('h3')[0].innerText = getName(key);

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

document.addEventListener('DOMContentLoaded' , () => {

    let item = getData(curDate);
    /* populate with current data */
    populate(item, curDate);

});