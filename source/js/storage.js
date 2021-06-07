/*
storage.js
functions to get/set local storage 
*/
import { getDaysKey } from './date.js';

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
}

/**
addTask
add a task into local storage
@param key: 2021-05-17
@param task: the json data returned from Task.content
@return true/false if successful
*/
function addTask(key, task) {
    const dayData = getData(key);
    if (dayData == null) return false;
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
    const dayData = getData(key);
    if (dayData == null) return false;
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
    const dayData = getData(key);
    if (dayData == null) return false;
    dayData.media.push(link);
    setData(key, dayData);
    return true;
}

/**
add custom tag
@param tagName string for the name of tag
@return true/false if successful
*/
function addCustomTag(tagName) {
    const colorArr = ['blue', 'red', 'pink', 'green', 'violet', 'orange'];
    const customTags = getData('custom-tags');
    if (customTags == null) return false;
    customTags[tagName] = colorArr[customTags.length % colorArr.length];
    setData('custom-tags', customTags);

    // add tag option to html list
    const newTag = document.createElement('option');
    newTag.innerHTML = tagName;
    const addTagOption = document.querySelector('add-tag-option');
    // document.querySelector('tag-selection').insertBefore(newTag, addTagOption);

    return true;
}

/**
get color for a custom tag
@param tagName string for the name of tag
@return the tag color
*/
function getCustomTagColor(tagName) {
    const customTags = getData('custom-tags');
    if (tagName in customTags === false) return '';
    return customTags[tagName];
}

/**
update paragraph
@param key: 2021-05-17
@param text: content of the notepad
@return true/false if successful
*/
function updateNotepad(key, text) {
    const dayData = getData(key);
    if (dayData == null) return false;
    dayData.notepad = text;
    setData(key, dayData);
    return true;
}

/**
temporary test function to satisfy linter
*/
function test() {
    addTask(getDaysKey(), 'task');
    addEvent(getDaysKey(), 'event');
    addLink(getDaysKey(), 'link');
    addCustomTag('newTag');
    updateNotepad(getDaysKey(), 'note');
}

test();

export { getData, getCustomTagColor };

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
