import Log from './log.js';

class Event extends Log {
    constructor() {
        super();
        const sha = this.shadowRoot;

        // add divs to this shadow root
        this.shadowRoot.innerHTML += `
            <div class='event-time-container'>
                <label for="">
                    &#8212;
                    <span contenteditable=true></span>
                </label>
                <small class='event-time'></small>
            </div>
            <div class='tags-container'>
                <span class='tags'>
                </span>
            </div>`;

        // DOM references to use in set/get
        this.titleDOM = sha.querySelector('.event-time-container span');
        this.timeDOM = sha.querySelector('.event-time-container .event-time');

        // prevent adding new line breaks for the event title (can't press enter)
        this.titleDOM.addEventListener('keypress', (k) => {
            if (k.keyCode === 13) k.preventDefault();
        });

        // string separator between from-time and to-time in the text
        this.timeStrSeparator = ' - ';
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
     */
    set content(event) {
        // set title
        this.titleDOM.innerText = event.content;

        // set time
        this.timeDOM.innerText = event.from + this.timeStrSeparator + event.to;
        if (this.timeDOM.innerText === this.timeStrSeparator)
            this.timeDOM.innerText = 'no time specified';

        // append a tag element inside the tag div
        this.setTags(event.tags);
    }

    get content() {
        const returnObj = {};

        // get the title
        returnObj.content = this.titleDOM.innerText;

        // get the from and to time
        const timeStr = this.timeDOM.innerText;
        const tsInd = timeStr.indexOf(this.timeStrSeparator);
        returnObj.from = timeStr.slice(0, tsInd);
        returnObj.to = timeStr.slice(tsInd + this.timeStrSeparator.length);

        // get the tags
        returnObj.tags = this.getTags();

        return returnObj;
    }
}

customElements.define('event-log', Event);
