import { getDaysKey } from './date.js';
import setState from './navigation.js';
import toggleOptionsDisplay from './button_controller.js';
import { getCustomTags, addCustomTag } from './storage.js';

// obj that maps displayed tag name on website options
// to the class name that options have to have
// for css to work, which is in log.js
const defaultTags = {
    UCSD: 'ucsd',
    Lecture: 'lecture',
    Other: 'other',
};

window.curDate = new Date();

/**
 * When the initial document is loaded, call populate on today's journal content
 * @listens document#DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // the key of the date that we want to load
    let key = '';
    const url = window.location.href;
    const searchStr = '?day=';
    const indexQ = url.indexOf(searchStr);
    const indexH = url.indexOf('#');

    // if the url contians ?day=2021-06-02 (came from weekly log button click)
    if (indexQ !== -1) key = url.slice(indexQ + searchStr.length);
    // if the url contains #2021-06-02 (came from weekly log pressing browser for/back)
    else if (indexH !== -1) key = url.slice(indexH + 1);
    // otherwise go to curDate
    else key = getDaysKey(window.curDate);

    // set the current state
    setState(key, false);

    // get the tags
    let tagObj = getCustomTags();
    if (Object.keys(tagObj).length === 0) tagObj = defaultTags;
    Object.keys(tagObj).forEach((item) => {
        addCustomTag(item);
    });

    // the Apply Tags should be visible at the start while others are hidden
    const applyTagsDOM = document.querySelector('#apply-tags-option');
    applyTagsDOM.style.display = 'none';
    toggleOptionsDisplay();

    document.querySelector('#weekly-log-link').onclick =
        function goToWeeklyLog() {
            window.location.href = `weekly_log.html?day=${getDaysKey(
                window.curDate
            )}`;
            return false;
        };
});
