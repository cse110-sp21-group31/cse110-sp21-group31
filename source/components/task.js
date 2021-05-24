class Task extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
            </style>

            <div class="task-log">
                <h2 class="task-log-content"></h2>
                <input class="task-log-completed" type="checkbox"></input>
                <div class="task-log-tags"></div>
            </div>
        `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    setContent(task) {
        // set content
        this.shadowRoot.querySelector('.task-log-content').innerText =
            task.content;

        // set completed, and the status of the checkbox
        this.shadowRoot.querySelector('.task-log-completed').checked =
            task.completed;

        // append a tag element inside the tag div for each individual tag string
        task.tags.forEach((tag) => {
            const singleTag = document.createElement('p');
            // can also set other attributes of element later if needed
            singleTag.innerText = tag;
            this.shadowRoot
                .querySelector('.task-log-tags')
                .appendChild(singleTag);
        });
    }

    /**
     *   returns the content to store in the database
     */
    getContent() {
        const returnObj = {};

        returnObj.content =
            this.shadowRoot.querySelector('.task-log-content').innerText; // get the content
        returnObj.completed = this.shadowRoot.querySelector(
            '.task-log-completed'
        ).checked; // get the completion
        returnObj.tags = [];
        this.shadowRoot.querySelectorAll('.task-log-tags p').forEach((item) => {
            returnObj.tags.push(item.innerText); // push tags in
        });

        return returnObj;
    }
}

customElements.define('task-log', Task);
