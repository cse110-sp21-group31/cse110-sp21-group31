import Log from './log.js';

export default class Event extends Log {
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
     *        from: hh:mm AM, (12hr)
     *        to: hh:mm PM (12hr)
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

    /**
     *
     * @param {string} oldTime - "hh:mm AM"
     * @returns  "hh:mm" (24hr)
     */
    static convert12To24(oldTime) {
        // if AM
        let newTime = '';
        if (oldTime.substring(oldTime.length - 2, oldTime.length) === 'AM') {
            // change 12AM to 00
            if (oldTime.substring(0, 2) === '12') {
                newTime = `00:${oldTime.substring(3, 5)}`;
            } else {
                newTime = oldTime.substring(0, 5);
            }
        } else if (oldTime.substring(0, 2) === '12') {
            // PM
            // keep 12 at 12PM
            newTime = oldTime.substring(0, 5);
        } else {
            // add 12 otherwise
            newTime = `${
                parseInt(oldTime.substring(0, 2), 10) + 12
            }${oldTime.substring(2, 5)}`;
        }
        return newTime;
    }

    get content() {
        const returnObj = {};

        // get the title
        returnObj.content = this.titleDOM.innerText;

        // get the from and to time
        const timeStr = this.timeDOM.innerText;
        const tsInd = timeStr.indexOf(this.timeStrSeparator);
        // convert 12hr to 24hr
        const oldFrom = timeStr.slice(0, tsInd);
        const oldTo = timeStr.slice(tsInd + this.timeStrSeparator.length);

        returnObj.from = this.convert12To24(oldFrom);
        returnObj.to = this.convert12To24(oldTo);

        // get the tags
        // returnObj.tags = this.getTags();

        return returnObj;
    }
}

customElements.define('event-log', Event);
