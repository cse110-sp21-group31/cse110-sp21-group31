class Event extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
            </style>

            <div class='task-event'>
                <div class='event-time-container'>
                    <label for=""><input type="checkbox">Event 1</label>
                    <small class='event-time'>11:00am - 12:30pm</small>
                </div>
                <div class='tags-container'>
                    <span class='tags'>
                        <small class='tag-label lecture-tag'>Lecture</small>
                        <small class='tag-label UCSD-tag'>UCSD</small>
                    </span>
                </div>
            </div>
        `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * @param event - json for the event
     * @example
     *    {
     *        content: "CSE 110 Lecture",
     *        tags: ["Lecture", ...],
     *        from: 1621308663,
     *        to: 1621367364
     *    }
     *
     *
     */
    set content(event) {
        // set content
        this.shadowRoot.querySelector('.event-log-content').innerText =
            event.content;

        this.shadowRoot.querySelector('.event-log-from').innerText = event.from;
        this.shadowRoot.querySelector('.event-log-to').innerText = event.to;

        // append a tag element inside the tag div for each individual tag string
        event.tags.forEach((tag) => {
            const singleTag = document.createElement('p');
            // can also set other attributes of element later if needed
            singleTag.innerText = tag;
            this.shadowRoot
                .querySelector('.event-log-tags')
                .appendChild(singleTag);
        });
    }

    get content() {
        const returnObj = {};
        returnObj.content =
            this.shadowRoot.querySelector('.event-log-content').innerText;
        returnObj.from =
            this.shadowRoot.querySelector('.event-log-from').innerText;
        returnObj.to = this.shadowRoot.querySelector('.event-log-to').innerText;

        returnObj.tags = [];
        this.shadowRoot
            .querySelectorAll('.event-log-tags p')
            .forEach((item) => {
                returnObj.tags.push(item.innerText);
            });

        return returnObj;
    }
}

customElements.define('event-log', Event);
