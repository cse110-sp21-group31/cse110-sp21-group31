# How and where to store data

* Status: [accepted]
* Deciders: [entire team]
* Date: [2021-05-10]

## Context and Problem Statement

Since our bullet journal will have to store text, images, and audio clips, we need a place to store those things. Where and how will we store them?

## Considered Options

* Local Storage
* Implement Database

## Decision Outcome

Chosen option: Local storage

### Positive Consequences 

* Easier to implement, given the amount of time left

### Negative Consequences

* Limited in size
* However, we only need to store links to images and audio clips, thus not a considerable problem

## Pros and Cons of the Options

### Local Storage

* Good, because it would be easier to implement for us
* Bad, beacuse the storage is limited to 5 megabytes for users

### Backend with Database

* Good, because it can store practically unlimited amounts of data for users
* Bad, because most likely we will need to learn and use third party databases
* Bad, because users might feel uneasy uploading their personal data to an exteral website
* Bad, because then we will have to implement methods of separating data, like a login system