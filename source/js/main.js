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

/**
 * When the initial document is loaded, call populate on today's journal content
 * @listens document#DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // set the current state
    // window.localStorage.clear();
    const key = getDaysKey(window.curDate);
    setState(key);

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
});
