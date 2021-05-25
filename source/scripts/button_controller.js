// button_controller.js

/*
implements tag selector functionality
*/
document.getElementById("tag-selection").addEventListener("change", ()=> {
    if(this.value === "default") {
        return;
    }
    if(this.value === "Add Tag Here...") {
        // open dialog to enter custom tag
        this.value = "default";
        return;
    }
    const tags = this.children;
    for(let i = 0; i < tags.length; i += 1) {
        if(tags[i].innerHTML === this.value) {
            if(tags[i].innerHTML.includes("✓")) {
                tags[i].innerHTML = this.value.substring(0, this.value.length - 2);
            } else {
                tags[i].innerHTML = `${this.value  } ✓`;
            }
            this.value = "default";
        }
    }
});

/*
implements upload button functionality
*/
document.getElementById("task-event-textbox").addEventListener("keypress", (button)=> {
    if(button.key === "Enter") {
        const input = document.getElementById("task-event-textbox");
        // ensure bar is not empty
        if(!input.value.replace(/\s/g, "").length) { return; }

        // grab event/tag/time info
        const entry = [];

        // console.log(document.getElementById("task-event-selector").value);
        let taskEventChoice = document.getElementById("task-event-selector").value;
        if(taskEventChoice === "default") {
            // default to task
            taskEventChoice = "Task";
        } 
        if(taskEventChoice === "Task") {
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
            const tags = document.getElementById("tag-selection").children;
            for(let i = 0; i < tags.length; i += 1) {
                if(tags[i].innerHTML.includes("✓")) {
                    entry.tags.push(tags[i].innerHTML.substring(0, tags[i].innerHTML.length - 2));
                }
            }
            
            // initialize task element
            const newEntry = document.createElement("task-log");
            newEntry.content = entry;

            // Append task element to log (subject to change according to log css etc.)
            const taskSpace = document.getElementById("log-tasks-area");
            taskSpace.appendChild(newEntry);
        } else if(taskEventChoice === "Event") {
            /*  entry should contain:
            * 
            *   content: "CSE 110 Lecture",
            *   tags: ["Lecture", ...],
            *   from: 1621308663,
            *   to: 1621367364
            */
            entry.content = input.value;
            entry.tags = []; 
            
            // collect selected tags from tag bar
            const tags = document.getElementById("tag-selection").children;
            for(let i = 0; i < tags.length; i += 1) {
                if(tags[i].innerHTML.includes("✓")) {
                    entry.tags.push(tags[i].innerHTML.substring(0, tags[i].innerHTML.length - 2));
                }
            }

            // pull time info from clock icon (not implemented yet)
            entry.from = "";
            entry.to = "";

            // initialize event element
            const newEntry = document.createElement("event-log");
            newEntry.content = entry;

            // Append event element to log (subject to change)
            const eventSpace = document.getElementById("log-events-area");
            eventSpace.appendChild(newEntry);   
        }
    }
});
