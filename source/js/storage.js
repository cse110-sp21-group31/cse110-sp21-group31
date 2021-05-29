/**
storage.js
functions to get/set local storage 
*/
import { getDaysKey } from './date';

/*
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
@return: whether or not the day exists
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
*/
function addEvent(key, event) {
    const dayData = getData(key);
    dayData.events.push(event);
    setData(key, dayData);
}

/**
addLink
*/
function addLink(key, link) {
    const dayData = getData(key);
    dayData.media.push(link);
    setData(key, dayData);
}

/**
add custom tag
*/
function addCustomTag(tagName) {
    const colorArr = ['blue', 'red', 'yellow', 'green'];
    const customTags = getData('custom-tags');
    customTags[tagName] = colorArr[customTags.length % colorArr.length];
    setData('custom-tags', customTags);

    // add tag option to html list
    const newTag = document.createElement('option');
    newTag.innerHTML = tagName;
    const addTagOption = document.querySelector('add-tag-option');
    document.querySelector('tag-selection').insertBefore(newTag, addTagOption);
}

/**
update paragraph
*/
function updateNotepad(key, text) {
    const dayData = getData(key);
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
