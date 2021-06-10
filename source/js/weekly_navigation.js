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
function removeAll(taskBox) {

    // sideBar remover
    const sideBar_len = sideBar.childNodes.length;
    for (let i = 0; i < sideBar_len; i += 1) {
        sideBar.removeChild(sideBar.lastChild);
    }

    // task remover
    const taskBox_len = taskBox.childNodes.length;
    for (let i = 0; i < taskBox_len; i += 1) {
        taskBox.removeChild(taskBox.lastChild);
    }
}

// this function is here just as a reference
// so i can use it in populate()
// the function content is at the bottom of the file
let sideBarClick = function sideBarClickedTemp() {};

function setTasks(allTasks, taskBox) {
    allTasks.forEach((task) => {
        taskBox.append('—' + task.content);
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

    // Test Events
    let test_events = {
        '2021-06-07': {
            name: "Thursday, May 13th",
            notepad: "blan blah blah",
            tasks: [
                {
                    content: "Go on a run",
                    completed: true/false,
                    tags: ["Other"]
                },
            ],
            events: [
                {
                    content: "CSE 110 Lecture",
                    tags: "Lecture",
                    from: "4:30 AM",
                    to: "7:30 AM"
                }, 
            ],
            media: [
                "link1", "link2",
            ]
        },

        '2021-06-08': {
            name: "Thursday, May 13th",
            notepad: "blan blah blah",
            tasks: [
                {
                    content: "Go on a run",
                    completed: true/false,
                    tags: ["Other"]
                },
            ],
            events: [
                {
                    content: "CSE 110 Lecture",
                    tags: "Lecture",
                    from: "2:15 PM",
                    to: "5:37 PM"
                }, 
            ],
            media: [
                "link1", "link2"
            ]
        },

        '2021-06-09': {
            name: "Thursday, May 13th",
            notepad: "blan blah blah",
            tasks: [
                {
                    content: "Go on a run",
                    completed: true/false,
                    tags: ["Other"]
                },
            ],
            events: [
                {
                    content: "CSE 110 Lecture",
                    tags: "Lecture",
                    from: "2:05 AM",
                    to: "3:20 AM"
                }, 
            ],
            media: [
                "link1", "link2"
            ]
        },
        '2021-06-10': {
            name: "Thursday, May 13th",
            notepad: "blan blah blah",
            tasks: [
                {
                    content: "Go on a run",
                    completed: true/false,
                    tags: ["Other"]
                },
            ],
            events: [
                {
                    content: "CSE 110 Lecture",
                    tags: "Lecture",
                    from: "4:00 AM",
                    to: "11:35 AM"
                }, 
            ],
            media: [
                "link1", "link2"
            ]
        },
        '2021-06-11': {
            name: "Thursday, May 13th",
            notepad: "blan blah blah",
            tasks: [
                {
                    content: "Go on a run",
                    completed: true/false,
                    tags: ["Other"]
                },
            ],
            events: [
                {
                    content: "CSE 110 Lecture",
                    tags: "Lecture",
                    from: "4:00 AM",
                    to: "5:30 AM"
                }, 
            ],
            media: [
                "link1", "link2"
            ]
        },
    }

    // Sets all dates for each day
    const days = document.getElementsByClassName('date');
    for (let i = 0; i < 7; i += 1) {

        // loop through every log
        const tempKey = getDaysKey(window.curDate);
        const log = getDaysData(tempKey);
        console.log(tempKey + ", " + test_events[tempKey]);
        window.curDate.setDate(window.curDate.getDate() + 1);
        
        // eslint-disable-next-line prefer-destructuring
        days[i].innerText = getName(tempKey).split(',')[1];

        // task variables
        const allTasks = log.tasks;
        const taskDay = log.name.slice(0,3).toLowerCase();
        const taskID = ['cal', 'task', taskDay].join('-');
        const taskBox = document.getElementById(taskID);

        // clear any existing entries (add var for event container as parameter)
        removeAll(taskBox);

        if(test_events[tempKey] == undefined){ 
            continue;
        }

        const allEve = test_events[tempKey].events;
        const day = test_events[tempKey].name;
        console.log(allEve);

        for(let j = 0; j < allEve.length; j += 1 ){
            const event_label = document.createElement('label');

            const start_time = allEve[j].from;
            const end_time = allEve[j].to;

            const start_time_hr = start_time.slice(0, start_time.indexOf(':'));
            const start_time_minutes = start_time.substr(start_time.indexOf(':')+1, 3);
            
            const end_time_hr = end_time.slice(0, end_time.indexOf(':'));
            const end_time_minutes = end_time.substr(end_time.indexOf(':')+1, 3);
            
            const start_time_ampm = start_time.slice(-2);
            const end_time_ampm = end_time.slice(-2);

            console.log(`start time hr:min: ${start_time_hr}, ${start_time_minutes} ${start_time_ampm} end time hr:min${end_time_hr}, ${end_time_minutes} ${end_time_ampm}`);
            
            // Constant attributes
            event_label.style.position = 'absolute';
            event_label.style.left = 0;
            event_label.style.color = 'white';
            event_label.style.display = 'flex';
            event_label.style.flexDirection = 'row';
            event_label.style.width = '100%';
            event_label.style.justifyContent = 'center';
            event_label.style.alignItems = 'center';
            event_label.style.backgroundColor = 'lightpink';
            event_label.textContent = allEve[j].content;
            
            /*
                Use start time to calculate 'top'
            */
            let top = start_time_hr + 10*(start_time_minutes/60);
            if(start_time_ampm == 'AM') { 
                event_label.style.top = top; 
            } else {
                top = parseFloat(top) + 120;
                top += '%';
                event_label.style.top = top;
            }

            /* 
                Use end time to calculate 'bottom'
                Note: this depends on whether event ends before or after 10 am
                less than  10 and AM:
            */
            let bottom;
            if(end_time_hr < 10 && end_time_ampm == 'AM') { 
                bottom = 10*(10-end_time_hr) + 10*(end_time_minutes/60);
                bottom += '%';
                event_label.style.bottom = bottom; 
            } else if(end_time_hr > 10 && end_time_ampm == 'PM') {
                bottom = 10 + 10*(end_time_minutes/60);
                bottom = '-' + bottom + '%';
                event_label.style.bottom = bottom; 
            } else {
                bottom = 20 + 10*(10-end_time_hr) + 10*(end_time_minutes/60);
                bottom = '-' + bottom + '%';
                event_label.style.bottom = bottom;
            }
            
            const id = 'cal-' + day.slice(0, 3).toLowerCase();
            console.log(`id=${id}`);
            // document.getElementById(id).appendChild(event_label);
            console.log(`element = ${document.getElementById(id)}`);
        }

        // setting all tasks
        setTasks(allTasks, taskBox);

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
