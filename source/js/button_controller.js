import { addCustomTag } from './storage.js';

/* 
button_controller.js
contains tag selection and input bar upload funcionality
*/

const tagSelectorDOM = document.getElementById('tag-selection');
const applyTagsDOM = tagSelectorDOM.querySelector('#apply-tags-option');
const optionArr = document.querySelectorAll('.all-tags');
const newHeight = '150px'; // new height of tag selection box when clicked on

/**
 * toggle the css display value
 * for the tag selection options
 */
function toggleOptionsDisplay() {
    // loop over all the options in the array to toggle the display
    for (let i = 0; i < optionArr.length; i += 1) {
        const item = optionArr[i];
        item.style.display = item.style.display === '' ? 'none' : '';
        item.selected = false;
    }
}

// the Apply Tags should be visible at the start while others are hidden
applyTagsDOM.style.display = 'none';
toggleOptionsDisplay();

/**
 * handling the click events on the document
 */
document.addEventListener('click', (event) => {
    // onclick tag selector, display the elements and
    // expand the height of tag selector
    if (event.target == applyTagsDOM) {
        if (tagSelectorDOM.style.height === newHeight) return;
        tagSelectorDOM.style.height = newHeight;
        toggleOptionsDisplay();
    }

    // onclick other places, hide the elements and
    // decrease the height of tag selector
    else if (event.target.getAttribute('class') != 'all-tags') {
        if (tagSelectorDOM.style.height === '') return;
        tagSelectorDOM.style.height = '';
        toggleOptionsDisplay();
    }
});

const addTagDOM = document.getElementById('add-tag-option');
addTagDOM.addEventListener('keypress', (button) => {
    if (button.key === 'Enter') {
        // addCustomTag(addTagDOM.value);
        const newTag = document.createElement('option');
        newTag.innerText = addTagDOM.value;
        newTag.setAttribute('class', 'all-tags');
        tagSelectorDOM.insertBefore(newTag, tagSelectorDOM.lastElementChild);
        addTagDOM.value = '';
    }
});

// tag selecting tags onclick
tagSelectorDOM.addEventListener('change', function handleTags() {
    if (this.value === 'default') {
        return;
    }
    if (this.value === 'Add Tag Here...') {
        // open dialog to enter custom tag

        this.value = 'default';
        return;
    }
    const tags = this.children;
    for (let i = 0; i < tags.length; i += 1) {
        if (tags[i].innerHTML === this.value) {
            if (tags[i].innerHTML.includes('✓')) {
                tags[i].innerHTML = this.value.substring(
                    0,
                    this.value.length - 2
                );
            } else {
                tags[i].innerHTML = `${this.value} ✓`;
            }
            this.value = 'default';
        }
    }
});

document.addEventListener('keypress', (button) => {
    if (button.key === 'y') {
        const tags = document.getElementById('tag-selection');
        tags.click();
    }
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
            const entry = [];

            // console.log(document.getElementById("task-event-selector").value);
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
                const tags = document.getElementById('tag-selection').children;
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
                const tags = document.getElementById('tag-selection').children;
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
                entry.from =
                    document.getElementById('start-time').children[0].value;
                if (entry.from !== '') {
                    let startHour = entry.from.split(':', 2)[0];
                    const startMin = entry.from.split(':', 2)[1];
                    let startSuffix = '';
                    if (startHour > 12) {
                        startHour -= 12;
                        if (startHour < 10) {
                            startHour = `0${startHour}`;
                        }
                        startSuffix = 'PM';
                    } else {
                        startSuffix = 'AM';
                    }
                    entry.from = `${startHour}:${startMin} ${startSuffix}`;
                }

                entry.to =
                    document.getElementById('end-time').children[0].value;
                if (entry.to !== '') {
                    let endHour = entry.to.split(':', 2)[0];
                    const endMin = entry.to.split(':', 2)[1];
                    let endSuffix = '';
                    if (endHour > 12) {
                        endHour -= 12;
                        if (endHour < 10) {
                            endHour = `0${endHour}`;
                        }
                        endSuffix = 'PM';
                    } else {
                        endSuffix = 'AM';
                    }
                    entry.to = `${endHour}:${endMin} ${endSuffix}`;
                } else {
                    entry.to = '';
                }

                // initialize event element
                const newEntry = document.createElement('event-log');
                newEntry.content = entry;

                // Append event element to log (subject to change)
                const eventSpace = document.getElementById('log-events-area');
                eventSpace.appendChild(newEntry);
            }
            // clear input bar
            input.value = '';
        }
    });
