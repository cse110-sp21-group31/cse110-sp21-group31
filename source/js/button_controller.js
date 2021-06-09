import { addEvent, addTask, addCustomTag } from './storage.js';
import { getDaysKey } from './date.js';

/* 
button_controller.js
contains tag selection and input bar upload funcionality
*/

/**
 *
 * @param {string} oldTime - "hh:mm (24hr)"
 * @returns "hh:mm AM" (12hr)
 */
export function convert24To12(oldTime) {
    if (oldTime !== '') {
        let endHour = oldTime.split(':', 2)[0];
        const endMin = oldTime.split(':', 2)[1];
        let endSuffix = '';
        if (endHour > 12) {
            endHour -= 12;
            if (endHour < 10) {
                endHour = `0${endHour}`;
            }
            endSuffix = 'PM';
        } else {
            if (endHour === '12') {
                endSuffix = 'PM';
            } else {
                endSuffix = 'AM';
            }
            if (endHour === '00') {
                endHour = '12';
            }
        }
        return `${endHour}:${endMin} ${endSuffix}`;
    }
    return '';
}

/**
 * toggle the css display value
 * for the tag selection options
 */
function toggleOptionsDisplay() {
    const optionArr = document.querySelectorAll('.all-tags');

    // loop over all the options in the array to toggle the display
    for (let i = 0; i < optionArr.length; i += 1) {
        const item = optionArr[i];
        item.style.display = item.style.display === '' ? 'none' : '';
        item.selected = false;
    }
}

const tagSelectorDOM = document.getElementById('tag-selection');

if (tagSelectorDOM !== null) {
    const applyTagsDOM = tagSelectorDOM.querySelector('#apply-tags-option');
    const newHeight = '150px'; // new height of tag selection box when clicked on

    /**
     * handling the click events on the document
     */
    document.addEventListener('click', (event) => {
        const eleClass = event.target.getAttribute('class');

        // onclick tag selector, display the elements and
        // expand the height of tag selector
        if (event.target === applyTagsDOM) {
            if (tagSelectorDOM.style.height === newHeight) return;
            tagSelectorDOM.style.height = newHeight;
            toggleOptionsDisplay();
        }

        // onclick other places, hide the elements and
        // decrease the height of tag selector
        else if (eleClass === null || eleClass.indexOf('all-tags') === -1) {
            if (tagSelectorDOM.style.height === '') return;
            tagSelectorDOM.style.height = '';
            toggleOptionsDisplay();
        }
    });

    const addTagDOM = document.getElementById('add-tag-option');
    addTagDOM.addEventListener('keypress', (button) => {
        if (button.key === 'Enter') {
            // ensure bar is not empty
            if (addTagDOM.value.replace(/\s/g, '').length) {
                // replace spaces and dashes with underscores
                let tagText = addTagDOM.value;
                tagText = tagText.replace(/\s/g, '_');
                tagText = tagText.replace('-', '_');
                addCustomTag(tagText);
                addTagDOM.value = '';
            }
        }
    });

    // tag selecting tags onclick
    tagSelectorDOM.addEventListener('change', function handleTags() {
        if (this.value === 'default') {
            return;
        }

        // skip over the last option which is padding
        if (this.value === '') {
            this.value = 'default';
            return;
        }

        const tags = this.children;
        let selectedCount = 0;
        for (let i = 0; i < tags.length; i += 1) {
            if (tags[i].innerHTML.includes('✓')) {
                selectedCount += 1;
            }
        }

        addTagDOM.placeholder = 'Add Tag Here...';
        for (let i = 0; i < tags.length; i += 1) {
            if (tags[i].innerHTML === this.value) {
                if (tags[i].innerHTML.includes('✓')) {
                    tags[i].innerHTML = this.value.substring(
                        0,
                        this.value.length - 2
                    );
                } else if (selectedCount < 3) {
                    // add tag if check not present and less that 3 selected currently
                    tags[i].innerHTML = `${this.value} ✓`;
                } else {
                    addTagDOM.placeholder = '3 Tags Max!';
                }
            }
        }
        this.value = 'default';
    });

    /*
implements upload button functionality
*/
    document
        .getElementById('task-event-textbox')
        .addEventListener('keypress', (button) => {
            if (button.key === 'Enter') {
                const input = document.getElementById('task-event-textbox');
                // ensure bar is not empty
                if (!input.value.replace(/\s/g, '').length) {
                    return;
                }

                // grab event/tag/time info
                const entry = {};

                let taskEventChoice = document.getElementById(
                    'task-event-selector'
                ).value;
                if (taskEventChoice === 'default') {
                    // default to task
                    taskEventChoice = 'Task';
                }
                if (taskEventChoice === 'Task') {
                    /*  entry should contain:
                     *
                     *   content: "Go on a run",
                     *   completed: true/false,
                     *   tags: ["Other", ...]
                     */
                    entry.content = input.value;
                    entry.completed = false;
                    entry.tags = [];

                    // collect selected tags from tag bar
                    const tags =
                        document.getElementById('tag-selection').children;
                    for (let i = 0; i < tags.length; i += 1) {
                        if (tags[i].innerHTML.includes('✓')) {
                            entry.tags.push(
                                tags[i].innerHTML.substring(
                                    0,
                                    tags[i].innerHTML.length - 2
                                )
                            );
                        }
                    }

                    // initialize task element
                    const newEntry = document.createElement('task-log');
                    newEntry.content = entry;

                    // Append task element to log (subject to change according to log css etc.)
                    const taskSpace = document.getElementById('log-tasks-area');
                    taskSpace.appendChild(newEntry);

                    addTask(getDaysKey(window.curDate), entry);
                } else if (taskEventChoice === 'Event') {
                    /*  entry should contain:
                     *
                     *   content: "CSE 110 Lecture",
                     *   tags: ["Lecture", ...],
                     *   from: 1621308663,   (currently contains hh:mm A/PM)
                     *   to: 1621367364      (currently contains hh:mm A/PM)
                     */
                    entry.content = input.value;
                    entry.tags = [];

                    // collect selected tags from tag bar
                    const tags =
                        document.getElementById('tag-selection').children;
                    for (let i = 0; i < tags.length; i += 1) {
                        if (tags[i].innerHTML.includes('✓')) {
                            entry.tags.push(
                                tags[i].innerHTML.substring(
                                    0,
                                    tags[i].innerHTML.length - 2
                                )
                            );
                        }
                    }

                    // pull time info from clock icon
                    entry.from = convert24To12(
                        document.getElementById('start-time').children[0].value
                    );
                    entry.to = convert24To12(
                        document.getElementById('end-time').children[0].value
                    );

                    // initialize event element
                    const newEntry = document.createElement('event-log');
                    newEntry.content = entry;

                    // Append event element to log (subject to change)
                    const eventSpace =
                        document.getElementById('log-events-area');
                    eventSpace.appendChild(newEntry);
                    addEvent(getDaysKey(window.curDate), entry);
                }
                // clear input bar
                input.value = '';
            }
        });
}
export default toggleOptionsDisplay;
