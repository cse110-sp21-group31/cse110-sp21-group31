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
*/
function addTask(key, task) {
    const dayData = getData(key);
    if (dayData == null) return;
    dayData.tasks.push(task);
    setData(key, dayData);
}

/**
addEvent
add an event into local storage
@param key: 2021-05-17
@param event: the json data returned from Event.content
*/
function addEvent(key, event) {
    const dayData = getData(key);
    if (dayData == null) return;
    dayData.events.push(event);
    setData(key, dayData);
}

/**
addLink
add a new link for a day
@param key: 2021-05-17
@param link: the link that will be added to media
*/
function addLink(key, link) {
    const dayData = getData(key);
    if (dayData == null) return;
    dayData.media.push(link);
    setData(key, dayData);
}

/**
addCustomTag
add a new custom tag
@param tagName: name of desired new tag
*/
function addCustomTag(tagName) {
    const colorArr = ['blue', 'red', 'yellow', 'green'];
    const customTags = getData('custom-tags');
    if (customTags == null) return;
    customTags[tagName] = colorArr[customTags.length % colorArr.length];
    setData('custom-tags', customTags);

    // add tag option to html list
    const newTag = document.createElement('option');
    newTag.innerHTML = tagName;
    const addTagOption = document.querySelector('add-tag-option');
    document.querySelector('tag-selection').insertBefore(newTag, addTagOption);
}

/**
updateNotepad
adds or updates the notepad for a day
@param key: 2021-05-17
@param text: content of the notepad
*/
function updateNotepad(key, text) {
    const dayData = getData(key);
    if (dayData == null) return;
    dayData.notepad = text;
    setData(key, dayData);
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

export default getData;

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
