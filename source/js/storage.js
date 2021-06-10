import { getDaysKey, getName } from './date.js';
/*
storage.js
functions to get/set local storage 
*/

/**
get/set the relevant data for the day specified in key
@param key: 2021-05-17
@returns: {events: [], tasks: [], name: "", media: []}
*/
function getData(key) {
    const res = localStorage.getItem(key);
    if (res == null) return null;
    return JSON.parse(res);
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
}

/* NEW STUFFFFFCFFFF
called when there is no data for passed in key
*/
function newDay(key) {
    const item = {
        name: getName(key),
        notepad: '',
        tasks: [],
        events: [],
        media: [],
    };

    setData(key, item);
    return item;
}

function getDaysData(key) {
    let res = getData(key);
    if (res == null) res = newDay(key);
    return res;
}

/**
addTask
add a task into local storage
@param key: 2021-05-17
@param task: the json data returned from Task.content
@return true/false if successful
*/
function addTask(key, task) {
    const dayData = getDaysData(key);
    dayData.tasks.push(task);
    setData(key, dayData);
    return true;
}

/**
addEvent
add an event into local storage
@param key: 2021-05-17
@param event: the json data returned from Event.content
@return true/false if successful
*/
function addEvent(key, event) {
    const dayData = getDaysData(key);
    dayData.events.push(event);
    setData(key, dayData);
    return true;
}

/**
addLink
@param key 2021-05-17
@param link string that represents link of media
@return true/false if successful
*/
function addLink(key, link) {
    const dayData = getDaysData(key);
    dayData.media.push(link);
    setData(key, dayData);
    return true;
}

function updateTaskChecked(key, taskInd, newVal) {
    const dayData = getDaysData(key);
    dayData.tasks[taskInd].completed = newVal;
    setData(key, dayData);
}

/*
get the custom tag array from storage
if it doesn't exist, then create the default one
*/
function getCustomTags() {
    let res = getData('custom-tags');

    // if custom-tags don't exist, create the default ones
    if (res == null) res = setData('custom-tags', {});

    return res;
}

function addCustomTagStorage(tagName) {
    const colorArr = ['red', 'blue', 'pink', 'green', 'violet', 'orange'];
    const customTags = getCustomTags();

    // pick a color for the new tag
    if (tagName in customTags === false) {
        customTags[tagName] =
            colorArr[Object.keys(customTags).length % colorArr.length];
        setData('custom-tags', customTags);
    }
}

/**
add custom tag
@param tagName string for the name of tag
@return true/false if successful
*/
function addCustomTag(tagName) {
    addCustomTagStorage(tagName);

    // add tag option to html list
    const newTag = document.createElement('option');
    newTag.innerHTML = tagName;
    newTag.setAttribute('class', 'all-tags');
    const tagSelectionDOM = document.querySelector('#tag-selection');
    tagSelectionDOM.insertBefore(newTag, tagSelectionDOM.lastElementChild);

    return true;
}

/**
get color for a custom tag
@param tagName string for the name of tag
@return the tag color
*/
function getCustomTagColor(tagName) {
    const customTags = getCustomTags();

    // false checks: if tags don't exist or if tagName isn't in there
    if (customTags == null || tagName in customTags === false) {
        return '';
    }

    return customTags[tagName];
}

/**
update paragraph
@param key: 2021-05-17
@param text: content of the notepad
@return true/false if successful
*/
function updateNotepad(key, text) {
    const dayData = getDaysData(key);
    dayData.notepad = text;
    setData(key, dayData);
    return true;
}

/**
temporary test function to satisfy linter
dont run this
*/

function test(run = false) {
    if (!run) return;

    addTask(getDaysKey(), 'task');
    addEvent(getDaysKey(), 'event');
    addLink(getDaysKey(), 'link');
    addCustomTag('newTag');
    updateNotepad(getDaysKey(), 'note');
}

// to satisfy linter, comment this line out
test();

export {
    getDaysData,
    getCustomTagColor,
    addTask,
    addEvent,
    addCustomTag,
    getCustomTags,
    updateTaskChecked,
    updateNotepad,
    addCustomTagStorage,
};

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
