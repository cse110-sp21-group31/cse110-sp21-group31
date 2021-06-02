import { getCustomTagColor } from '../storage.js';

class Log extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');

        // the common css for tasks and events
        template.innerHTML = `
        <style>
            label {
                font-family: 'Roboto', 'sans-serif';
            }
            
            .task-event {
                display: flex;
                height: 25%;
                width: 100%;
                flex: none;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            
            .task-event:hover {
                background-color: rgb(157, 207, 223);
            }
            
            .checkbox-label-container {
                padding: 0 0 0 1%;
            }
            
            .tags-container {
                display: flex;
                flex-direction: row;
                width: 25%;
                align-items: center;
                height: 100%;
                padding-right: 1%;
            }
            
            .tags {
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 50%;
                width: 100%;
            }
            
            .tag-label {
                flex: 0;
                font-family: 'Roboto', 'sans-serif';
                height: 40%;
                border-radius: 10px;
                padding: 5px 5px 5px 5px;
                box-shadow: 0px 1px 1px;
                margin: 0 5px 0 5px;
            }
            
            /* Starting Tag Classes */
            .UCSD-tag {
                background-color: rgb(161, 183, 122);
            }
            
            .lecture-tag {
                background-color: salmon;
            }
            
            .other-tag {
                background-color: violet;
            }
            
            /* Color Tags */
            .red-tag {
                background-color: rgb(166, 39, 0);
            }
            
            .blue-tag {
                background-color: rgb(64, 129, 183);
            }
            
            .green-tag {
                background-color: rgb(82, 173, 124);
            }
            
            .orange-tag {
                background-color: rgb(244, 135, 45);
            }
            
            .violet-tag {
                background-color: rgb(218, 189, 246);
            }
            
            .pink-tag {
                background-color: rgb(255, 163, 163);
            }
            
            .tag-label:hover {
                box-shadow: none;
            }
            
            .event-time-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                justify-content: center;
                padding: 0 0 0 1%;
            }
            
            .event-time {
                font-family: 'Sen', 'sans-serif';
                padding: 5% 0 0 0;
            }
            </style>
        `;

        // attatchign the shadow root
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // DOM references to use in set/get
        this.tagsDOM = this.shadowRoot.querySelector('.tags-container .tags');
    }

    /**
     * helper function to set tags
     * @param tagArr array of tag names to add in this log
     */
    setTags(tagArr) {
        tagArr.forEach((name) => {
            // get the color of this tag
            let colorClass = '';
            if (name === 'Lecture') colorClass = 'lecture';
            else if (name === 'UCSD') colorClass = 'ucsd';
            else if (name === 'Other') colorClass = 'other';
            else colorClass = getCustomTagColor(name);

            // create the tag
            // <small class='tag-label UCSD-label'>Lecture</small>
            const ele = document.createElement('small');
            ele.setAttribute('class', `tag-label ${colorClass}-tag`);
            ele.innerText = name;

            // add tag to shadow root
            this.shadowRoot
                .querySelector('.tags-container .tags')
                .appendChild(ele);
        });
    }

    /**
     * helper function to get all the tags
     * @return array of tag names in this log
     */
    getTags() {
        const tags = [];
        this.shadowRoot
            .querySelector('.tags-container .tags')
            .children.forEach((item) => {
                tags.push(item.innerText);
            });
        return tags;
    }
}

export default Log;
