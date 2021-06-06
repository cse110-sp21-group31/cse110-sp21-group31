/* 
button_controller.js
contains tag selection and input bar upload funcionality
*/

/*
implements tag selector functionality
*/
const tagSelectorDOM = document.getElementById('tag-selection');

function toggleOptionsDisplay() {
    const optionArr = tagSelectorDOM.querySelectorAll('option');
    for (let i = 0; i < optionArr.length; i += 1) {
        const item = optionArr[i];
        item.style.display = item.style.display === '' ? 'none' : '';
        item.selected = false;
    }
}
// initialize the display of the tag selection options
tagSelectorDOM.querySelector('#apply-tags-option').style.display = 'none';
toggleOptionsDisplay();

tagSelectorDOM.onclick = function () {
    const newHeight = '150px';
    if (this.style.height === newHeight) return;
    this.style.height = newHeight;
    toggleOptionsDisplay();
};

tagSelectorDOM.onmouseleave = function () {
    if (this.style.height === '') return;
    this.style.height = '';
    toggleOptionsDisplay();
};

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
