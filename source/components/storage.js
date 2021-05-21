/*
storage.js
functions to get/set local storage 
*/

/*
getKey
returns a string that represents the key that corresponds to the current date
@returns 2021-05-17
*/
function getKey(){
    const now = new Date();
    return [now.getFullYear(), now.getMonth(), now.getDate()].join('-');
}


/*
get/set the relevant data for the day specified in key
@param key: 2021-05-17
@returns: {events: [], tasks: [], name: "", media: []}
*/
function getDayData(key){
    const res = localStorage.getItem(key);
    if (res == null) return null;
    return JSON.parse(res);
}

function setDayData(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}


/*
addTask
add a task into local storage
@param key: 2021-05-17
@param task: the json data returned from Task.content
@return: whether or not the day exists
*/
function addTask(key, task){
    const dayData = getDayData(key);
    if (dayData == null) return false;

    dayData.tasks.push(task);
    setDayData(key, dayData);
    return true;
}

/*
addEvent
add an event into local storage
@param key: 2021-05-17
@param event: the json data returned from Event.content
*/
function addEvent(key, event){
    const dayData = getDayData(key);
    dayData.events.push(event);
    setDayData(key, dayData);
}

addTask(getKey(), "task");
addEvent(getKey(), "event");

/*


// store data (object)
let data = {name: "Civic", age: 13};
localStorage.setItem("entry1", JSON.stringify(data));

// get data (object)
let data = JSON.parse(localStorage.getItem("entry1"));

// getting an item that doesn't exist in the storage will return null
localStorage.getItem("256765434"); // returns null



LocalStorage: {
    
    "custom-tags": {
        "Lecture": "blue",
        "Assignment": "red",
        "Other": "yellow"
    },

    "2021-05-13": {
        name: "Thursday, May 13th",
        notepad: "blan blah blah",
        tasks: [
            {
                content: "Go on a run",
                completed: true/false,
                tags: ["Other", ...],
            }, task2, ...
        ],
        events: [
            {
                content: "CSE 110 Lecture",
                tags: "Lecture",
                from: 1621308663,
                to: 1621367364,
            }, event2, ...
        ],
        media: [
            "link1", "link2", ...
        ],
    }

    "2021-05-14": {...},

    "2021-05-15": {...},
}

*/