# Bullet Journal Pitch Document - Team 31

## [Google Slides Version](https://docs.google.com/presentation/d/1LN0QaDYnQGybovSRNXuex7BkuSn9WxUcT-Q5lRLusqs/edit?usp=sharing)

## [PDF File](CSE%20110%20Team%2031%20Pitch.pdf)

## User Personas

### Liam

![Liam](images/liam.png)

- Liam, 19 years old
- Sophomore in College, majoring in Biology
- Wants to organize assignments and due dates and start forming productive study habits
- Strives to become a doctor after finishing his education
- Due to the pandemic, school is online
    - Screen time is 6-7 hours
- Technology and software:
    - Mainly uses Laptop and Tablet for classes
    - Phone for social media
    - Uses Chrome, Canvas, and Google Drive

### Lisa

![Lisa](images/lisa.png)

- 35 years old
- Project manager for a S&P 500 company
- Wants to organize work for her team and herself, to deliver projects on time
- Technology and software
    - Primarily uses her laptop
    - Uses phone for social media and communication

### Jon

![Jon](images/jon.png)

- 27 years old
- Fitness trainer for celebrities
- Hard to track multiple clients' fitness progress and goals
- Technology and software
    - Primarily uses phone for tracking customers' needs
    - Fitness/health tracker apps (MyFitnessPal, Fitbit)

## Problem (Statement of Purpose)

- Target struggling college students who need to organize their life
- There is not a quick and easy way to organize your life digitally?
- Help with the uncertainty brought by the pandemic and online education
    - Online education can require more organization and planning
- No application that combines a daily and long-term task list with features like trackers and journaling
    - Utilize photos, videos, and recordings

## Scope

- Time for the project: 4 Weeks
- We are limiting to solving the problem identified for college students (at UCSD) only
- We will prioritizing finishing daily logs, and the ability to insert audio/images first
- Any extra features will be optional to add if time permits, but they will not be a priority

## Our Solution

- Index / Home Page
- Daily Log
    - Tasks / Events / Notes
- Weekly View
    - Includes lectures and assignments (recurring option available)
    - Synchronized with Daily Log
- Filtering System
    - By priority, tags (emojis), colors, finished tasks, etc.
    - For Weekly View
- Digital media
    - Images, Audio, Video, Embedded Links
    - Add to any task, note or event

## Fat Marker Sketch

![Fat Marker Sketch](fat_marker.png)

- Navigation and Logo
    - Has a sliding menu for accessing logs
    - Logo leads to the home page
- 3 Main panels
    - Central Panel for notes/tasks/events (NTE)
    - Pinned left and right panels
        - Can be used for pictures, videos, audio
- Bottom bar
    - Add a new NTE to the daily log
    - Select or create tags for the NTE
    - Attach media to the day or side panels

## Flowchart

![Flowchart](flowchart.drawio.png)

## Backend Design / Data Storage

- Store data on local storage
    - About 5 MB storage
- Decided against backend and authentication system
    - Provides privacy for our users as data is not stored on the cloud
    - In interest of time for development
- For media like images, videos, and audio
    - Instruct users to upload their files to a hosting service (Imgur, YouTube, etc.)
    - Embed these links into the bullet journal
    - Solves the limited storage issue

## Risks/Rabbit Holes

- Having too many features --- unnecessary complication of the user interface
- Avoid creating too many different logs or interface views
- Focusing on making base features first
    - Daily Log > Weekly View > anything else
- Bugs to Avoid
    - Empty tasks
    - Editing and Deleting tasks and notes
    - Synchronization between different views (logs, index, etc.)
    - Broken media upload

## No-Gos

- Future Log
- Calendar View
