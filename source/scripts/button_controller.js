// button_controller.js

/*
implements tag selector functionality
*/
document.getElementById("tag-selection").addEventListener("change", function() {
    if(this.value == "default") {
        return;
    }
    if(this.value == "Add Tag Here...") {
        // open dialog to enter custom tag
        this.value = "default";
        return;
    }
    let tags = this.children;
    for(let i = 0; i < tags.length; i++) {
        if(tags[i].innerHTML == this.value) {
            if(tags[i].innerHTML.includes("✓")) {
                tags[i].innerHTML = this.value.substring(0, this.value.length - 2);
            } else {
                tags[i].innerHTML = this.value + " ✓";
            }
            this.value = "default";
        }
    }
});

/*
implements upload button functionality
*/
document.getElementById("task-event-textbox").addEventListener("keypress", function(button) {
    if(button.key === "Enter") {
        let input = document.getElementById("task-event-textbox");
        // ensure bar is not empty
        if(!input.value.replace(/\s/g, "").length) { return; }

        // grab event/tag/time info
        let entry = [];

        // console.log(document.getElementById("task-event-selector").value);
        let taskEventChoice = document.getElementById("task-event-selector").value;
        if(taskEventChoice == "default") {
            // default to task
            taskEventChoice = "Task";
        } 
        if(taskEventChoice == "Task") {
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
            let tags = document.getElementById("tag-selection").children;
            for(let i = 0; i < tags.length; i++) {
                if(tags[i].innerHTML.includes("✓")) {
                    entry.tags.push(tags[i].innerHTML.substring(0, tags[i].innerHTML.length - 2));
                }
            }
            
            // initialize task element
            let newEntry = document.createElement("task-log");
            newEntry.content = entry;

            // Append task element to log (subject to change according to log css etc.)
            let taskSpace = document.getElementById("log-tasks-area");
            taskSpace.appendChild(newEntry);
        } else if(taskEventChoice == "Event") {
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
            let tags = document.getElementById("tag-selection").children;
            for(let i = 0; i < tags.length; i++) {
                if(tags[i].innerHTML.includes("✓")) {
                    entry.tags.push(tags[i].innerHTML.substring(0, tags[i].innerHTML.length - 2));
                }
            }

            // pull time info from clock icon (not implemented yet)
            entry.from = "";
            entry.to = "";

            // initialize event element
            let newEntry = document.createElement("event-log");
            newEntry.content = entry;

            // Append event element to log (subject to change)
            let eventSpace = document.getElementById("log-events-area");
            eventSpace.appendChild(newEntry);   
        }
    }
});