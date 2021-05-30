import Log from './log.js';

class Task extends Log {
    constructor() {
        super();
        const sha = this.shadowRoot;

        // add divs to this shadow root
        sha.innerHTML += `
            <div class='checkbox-label-container'>
                <label for="">
                    <input type="checkbox">
                    <span></span>
                </label>
            </div>
            <div class='tags-container'>
                <span class='tags'>
                </span>
            </div>`;

        // DOM references to use in set/get
        this.titleDOM = sha.querySelector('.checkbox-label-container span');
        this.checkDOM = sha.querySelector('.checkbox-label-container input');
    }

    /**
     * @param task - json data for the task
     * @example
     *    {
     *        content: "Go on a run",
     *        completed: true/false,
     *        tags: ["Other", ...]
     *    }
     *
     */
    set content(task) {
        // set title
        this.titleDOM.innerText = task.content;

        // set status of the checkbox
        this.checkDOM.checked = task.completed;

        // append a tag element inside the tag div
        this.setTags(task.tags);
    }

    /**
     *   returns the content to store in the database
     */
    get content() {
        const returnObj = {};

        // get the title
        returnObj.content = this.titleDOM.innerText;

        // get the checkmark status
        returnObj.completed = this.checkDOM.checked;

        // get the tags
        returnObj.tags = this.getTags();

        return returnObj;
    }
}

customElements.define('task-log', Task);
