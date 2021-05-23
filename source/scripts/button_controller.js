// button_controller.js

/*
implements tag selector functionality
*/
document.getElementById("tag-selection").addEventListener("change", function() {
    if(this.value == "Add Tag Here...") {
        // open dialog to enter custom tag
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
            // undecided behavior on if task/event option not selected
        } else if(taskEventChoice == "Task") {
            /*  entry should contain:
            *
            *   content: "Go on a run",
            *   completed: true/false,
            *   tags: ["Other", ...]
            */
            entry.content = input.value;
            entry.completed = false;
            entry.tags = []; 
            
            // multiple tag behavior not implemented yet
            let firstTag = document.getElementById("tag-selection");
            if(firstTag.value != "Add Tag Here...") {
                entry.tags.push(firstTag.value);
            }
             
            let newEntry = document.createElement("task-log");
            newEntry.content = entry;

            let taskSpaces = document.getElementById("log-tasks-area").children;
            for(let i = 0; i < taskSpaces.length; i++) {
                console.log(taskSpaces[i]);

                // a "label" element with the class "empty-space" needs to exist for a task to be inserted
                if(taskSpaces[i].getAttribute("class") == "empty-space") {
                    taskSpaces[i].setAttribute("class", "filled-space");
                    taskSpaces[i].appendChild(newEntry);
                    /*
                        TODO: add task to local storage
                    */
                    return;
                }
            }
        } else if(taskEventChoice == "Event") {

            /*  entry should contain:
            * 
            *   content: "CSE 110 Lecture",
            *   tags: ["Lecture", ...],
            *   from: 1621308663,
            *   to: 1621367364
            */

            /*
                TODO:
            */

        }
    }
});