import { addEvent, addTask, addCustomTag } from './storage.js';
import { getDaysKey } from './date.js';
// import { getDate } from './navigation.js';

/* 
button_controller.js
contains tag selection and input bar upload funcionality
*/

const tagSelectorDOM = document.getElementById('tag-selection');

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

if (tagSelectorDOM !== null) {
    const applyTagsDOM = tagSelectorDOM.querySelector('#apply-tags-option');
    const newHeight = '150px'; // new height of tag selection box when clicked on

    /**
     * handling the click events on the document
     */
    document.addEventListener('click', (event) => {
        const elements = document.elementsFromPoint(
            event.clientX,
            event.clientY
        );

        let closeSideBar = true;
        let openTagWindow = true;
        let closeTagWindow = true;
        let closeClock = true;

        for (let i = 0; i < elements.length; i += 1) {
            const eleClass = elements[i].getAttribute('class');
            const eleId = elements[i].getAttribute('id');

            // onclick tag selector, display the elements and
            // expand the height of tag selector
            if (openTagWindow && elements[i] === applyTagsDOM) {
                if (tagSelectorDOM.style.height !== newHeight) {
                    tagSelectorDOM.style.height = newHeight;
                    toggleOptionsDisplay();
                    openTagWindow = false;
                }
            }

            // if you clicked on a element that has class 'all-tags'
            // then you cant close tag window
            if (eleClass !== null && eleClass.indexOf('all-tags') !== -1)
                closeTagWindow = false;

            // if you clicked on the sidebar itself
            // or the opensidebar button, dont close side bar
            if (eleId === 'mySidebar' || eleClass === 'openbtn')
                closeSideBar = false;

            // if you clicked inside the clock
            // then you shouldn't close it
            if (eleId === 'popup-clock' || eleId === 'clock-img')
                closeClock = false;
        }

        if (closeTagWindow && tagSelectorDOM.style.height !== '') {
            tagSelectorDOM.style.height = '';
            toggleOptionsDisplay();
        }

        if (
            closeSideBar &&
            document.getElementById('mySidebar').style.width !== '0px'
        )
            document.querySelector('.closebtn').onclick(event);

        if (closeClock) {
            const clockDOM = document.getElementById('popup-clock');
            if (clockDOM.style.display !== 'none')
                clockDOM.style.display = 'none';
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
                    const from24 =
                        document.getElementById('start-time').children[0].value;
                    const to24 =
                        document.getElementById('end-time').children[0].value;
                    const fromTime = convert24To12(from24);
                    const toTime = convert24To12(to24);

                    /**
                     *  Flipped Time cases(from is after to):
                     *  AM to AM/ PM to PM: flip times and create event normally
                     *  PM to AM: create two events through the night, split at 00:00
                     */

                    // check if times flipped(from hour is greater, or same hour & from minutes greater)
                    if (
                        from24.substring(0, 2) > to24.substring(0, 2) ||
                        (from24.substring(0, 2) === to24.substring(0, 2) &&
                            from24.substring(3, 5) > to24.substring(3, 5))
                    ) {
                        // check PM to AM
                        if (
                            fromTime.substring(
                                fromTime.length - 2,
                                fromTime.length
                            ) === 'PM' &&
                            toTime.substring(
                                toTime.length - 2,
                                toTime.length
                            ) === 'AM'
                        ) {
                            // create two events
                            // create and add tomorrow's event, change entry.to to 23:59
                            const tomorrowEntry =
                                document.createElement('event-log');
                            entry.from = '12:00 AM';
                            entry.to = toTime;

                            tomorrowEntry.content = entry;
                            window.curDate.setDate(
                                window.curDate.getDate() + 1
                            );
                            addEvent(getDaysKey(window.curDate), entry);
                            window.curDate.setDate(
                                window.curDate.getDate() - 1
                            );
                            // resume entry for today's event
                            entry.from = fromTime;
                            entry.to = '11:59 PM';
                        } else {
                            // flip times
                            entry.from = toTime;
                            entry.to = fromTime;
                        }
                    } else {
                        // normal time case
                        entry.from = fromTime;
                        entry.to = toTime;
                    }

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
