/*
storage.js
functions to get/set local storage 
*/

/*
getKey
returns a string that represents the key that corresponds to the current date
@returns 2021-05-17
*/
function getDaysKey(now){
    if (now == undefined) now = new Date();
    return [now.getFullYear(), now.getMonth(), now.getDate()].join('-');
}

//https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript
//https://www.w3schools.com/jsref/jsref_getday.as

/*
getName
@param: key of that day
@return: the name of that day "Thursday, May 13th"
*/
function getName(){
    const options = {weekday: "long", month: "long", day: "numeric"};
    let now = new Date();
    return now.toLocaleDateString("en-US", options);
}

/*
getWeek
@param key: input day key
@return: an array of keys for each day in the week that key belongs in
*/
/*function getWeek(key) {
    const msPerDay = 86400000;
    let now = new Date(key);
    let currentDay = now.getDay();
    let sundayTime = Date.now() - currentDay * msPerDay;
    let result = [];
    for(i = 0; i < 7; i++) { // days of week
        let date = new Date(sundayTime + (i * msPerDay));
        result.push(getDaysKey(date));
    }
    return result;
}*/

/*
get/set the relevant data for the day specified in key
@param key: 2021-05-17
@returns: {events: [], tasks: [], name: "", media: []}
*/
function getData(key){
    let res = localStorage.getItem(key);
    if (res == null) return null;
    return JSON.parse(res);
}

function setData(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}


/*
addTask
add a task into local storage
@param task: the json data returned from Task.content
@return: whether or not the day exists
*/
function addTask(key, task){
    let dayData = getData(key);
    if (dayData == null) return false;

    dayData['tasks'].push(task);
    setData(key, dayData);
    return true;
}

/*
addEvent
add a event into local storage
@param task: the json data returned from Task.content
*/
function addEvent(key, event){
    let dayData = getData(key);
    dayData['events'].push(events);
    setData(key, dayData);
}

/*
addLink
*/
function addLink(key, link){
    let dayData = getData(key);
    dayData['media'].push(link);
    setData(key, dayData);
}

/*
add custom tag
*/
function addCustomTag(tagName, colorIndex){
    const colorArr = ["blue", "red", "yellow", "green"];
    let customTags = getData("custom-tags");
    customTags[tagName] = colorArr[customTags.length % colorArr.length];
    setData("custom-tags", customTags);
}

/*
update paragraph
*/
function updateNotepad(key, text){
    let dayData = getData(key);
    dayData['notepad'] = text;
    setData(key, dayData);
}


/*

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
