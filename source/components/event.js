class Event extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement("template");
        template.innerHTML = `
            <style>
            </style>

            <div class="event-log">
                <h2 class="event-log-content"></h2>
                <h3 class="event-log-from"></h3>
                <h4 class="event-log-to"></h4>
                <div class="event-log-tags"></div>
            </div>
        `;

        this.attatchShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /* 
     * @param event:
     *    {
     *        content: "CSE 110 Lecture",
     *        tags: ["Lecture", ...],
     *        from: 1621308663,
     *        to: 1621367364
     *    }
     *
     */
    set content(event) {

        // set content
        this.shadowRoot.querySelector(".event-log-content").innerText = event.content;
        
        this.shadowRoot.querySelector(".event-log-from").innerText = event.from;
        this.shadowRoot.querySelector(".event-log-to").innerText = event.to;

        // append a tag element inside the tag div for each individual tag string
        event.tags.forEach((tag)=>{
            let singleTag = document.createElement("p");
            // can also set other attributes of element later if needed
            singleTag.innerText = tag;
            this.shadowRoot.querySelector("event-log-tags").appendChild(singleTag);
        });  
    }

    get content() {
        let returnObj = {};
        returnObj.content = this.shadowRoot.querySelector(".event-log-content").innerText;
        returnObj.from = this.shadowRoot.querySelector(".event-log-from").innerText;
        returnObj.to = this.shadowRoot.querySelector(".event-log-to").innerText;

        returnObj.tags = [];
        this.shadowRoot.querySelectorAll(".event-log-tags p").forEach((item)=>{
            returnObj.tags.push(item.innerText);                                               
        });

        return returnObj;
    }
}

customElements.define('event', Event);