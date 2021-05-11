# How and where to store data

## Context and Problem Statement

Since our bullet journal will have to store text, images, and audio clips, we need a place to store those things. Where and how will we store them?

## Considered Options

* Local Storage
* Implement Database

## Decision Outcome

Chosen option: Local storage, since it would be easier to implement and we don't need to store the actual images and audio clips, just the links to them.

## Pros and Cons of the Options

### Local Storage

* Good, because it would be easier to implement for us
* Bad, beacuse the storage is limited to 5 megabytes for users

### Backend with Database

* Good, because it can store practically unlimited amounts of data for users
* Bad, because most likely we will need to learn and use third party databases
* Bad, because users might feel uneasy uploading their personal data to an exteral website
* Bad, because then we will have to implement methods of separating data, like a login system