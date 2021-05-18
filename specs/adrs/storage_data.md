# Data Brainstorming

Where to store: local storage

// store data (object)
let data = {name: "Civic", age: 13};
localStorage.setItem("entry1", JSON.stringify(data));

// get data (object)
let data = JSON.parse(localStorage.getItem("entry1"));

// getting an item that doesn't exist in the storage will return null
localStorage.getItem("256765434"); // returns null

## Things to store:
- entries
  - title
  - list of tags
  - specify if it's an event or task or notepad
  - timing
    - like date
    - hours from or to
  - optional: (link to image file)
  - optional: (link to audio file)
  
- custom tags
  - name
  - color

Design Decisions:

How to store the entries?
consider: most times (on daily log view) we want to easily get all events on a single day.
>>solution: 
- key is date, and an array of entries is stored on that date
- con:


                How to store the color of tags?
solution1:
- store only name with tags under events
- store an array of custom tags by order of creation
- con: requires a for loop to determine colors of any tag
solution2: 
- store color with the tag under every event
- con: more space to store, lots of repeated information
>>solution3:
- store only name with tags under events
- store color of each tag separately
- refer to that object to determine color of tags
- con:

                How to store the media?
consider: although images/audio "link" to notes, for now they are only dependent on what day we are displaying
>>solution:
- store images/audio as an array of links under days separte from notes

                How to store the start/finish time?
consider: we want to compare and sort the events by time in daily and weekly view, but we also want to display the time with AM or PM
solution1:
- store a string like "07:05PM" "11:30AM" and write our own comparison function
- con: we need to write a comparison function for string dates
solution2: 
- store how many minutes since 12AM it is, like 482 (06:02AM)
- con: we need to write a function to convert a number to string to display
^DISCUSS THIS

                How to store the current weekday to display
consider: we want to display the string "Tuesday, May 4th" on top of every day. with javascript new Date() we get access to current date information specific to user's time zone.
solution1:
- store the key as the string we are printing out on the top of daily log
- when we want to access the data in a day, pass (new Date()) into a function to get the string so we can use that as a key in our local storage
- con: need to write a function to convert Date() to a string
- con: ugly key values: spaces. does it matter tho?
- con: complicated to get data for weekly logs
>>solution2:
- store the key as something easily converted from new Date()
- have a name key in every date to store the text that represents that day
- con: still need to write a couple functions
  - one to extract the key value for a particular day from new Date()
  - one to convert a particular key value to the string we display on top of daily log
  - one to get a list of key values of this week from a particular day (weekly view)



Proposed design:

LocalStorage: {
    
    "custom-tags": {
        "Lecture": "blue",
        "Assignments": "red",
        "Other": "yellow"
    },

    "2021-05-13": {
        name: "Thursday, May 13th",
        notepad: <p></p>
        tasks: [
            {
                content: "Go on a run",
                completed: true/false,
                tags: ["Lecture", ...],
            }, tasks2, ...
        ],
        events: [
            {
                content: "CSE 110 Lecture",
                tags: ["Lecture", ...],
                from: 1621308663,
                to: 1621367364,
            }, event2, ...
        ],
        media: [
            "link1", "link2", ...
        ],
    }

    "2021-05-14": {...},

    "2021-05-15": {...},
}

Discuss with team:
- how to store timeData? (second to last design decision)
- delete events that are older than 30 days?
- what other custom settings should users have?
  - if no other settings needed, what is in the gear icon on the top right of daily view?