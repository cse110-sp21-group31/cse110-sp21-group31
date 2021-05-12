# One Tag instead of Multiple Tags

* Status: accepted
* Deciders: Bryce Tsuyuki, Artyom Muradyan, Jonathan Deguzman, Victor Chen, Aryan Pareek, Allison Ngo
* Date: 2021-05-11

Technical Story: Multiple tags is impractical to implement for events (might get confusing) because of color choices for the weekly log + selecting them might get confusing.

## Context and Problem Statement

We originally wanted to allow the user to select multiple tags and apply them to both tasks and events. However, in the design stage, we ran into significant issues regarding things like selecting tags, how to explain the selection of multiple tags in a way that is not confusing for the user, the storage of multiple tags, and the choice of colors that derives from having multiple tags.

## Considered Options

* One Tag Only for tasks and events
* Multiple Tags Per task, one tag per event
* Multiple tags per task and event

## Decision Outcome

Chose to go with one tag only. Simplifies tag selection, better aligns our application with existing models (e.g. calendar and reminder apps which allow users to sort tasks and events into one single category), simplifies color selection for events in the week view.

### Positive Consequences

* Simplified implementation
* Reduced scope of project
* User understanding of our product is increased as it is closer to products that they might be familiar with

### Negative Consequences

* Decreased customization and flexibility for the user

## Pros and Cons of the Options

### One Tag Only for tasks and events

* Good, simplifies implementation
* Good, because consistency is kept between events and tasks - less confusing for users
* Bad, because it reduces user flexibility

### One tag for events, multiple tags for tasks

* Good, because it preserves some degree of flexibility to add multiple tags
* Bad, because user flexibility is somewhat reduced
* Bad, because it might be confusing to users to be able to add multiple tags for tasks, but only one tag for events (inconsistency between different parts of our interface)

### Multiple tags per task and event

* Good, because it gives the user the most flexibility
* Bad, because it introduces multiple implementation issues
* Bad, because it might be confusing for the user to be able to select multiple tags (other applications in this space seem to only allow one)
