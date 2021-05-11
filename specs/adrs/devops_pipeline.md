# DevOps Pipeline

* Status: Proposed
* Deciders: Bryce Tsuyuki, Artyom Mudaryan, Allison Ngo, Jonathan Deguzman, Harshil Panchal, Victor Chen
* Date: 2021-05-10

Technical Story: We need to develop our DevOps pipeline per Canvas.

## Context and Problem Statement

We need a CI/CD pipeline to automate our build process, to automate deploys of our project, to enforce code style and quality, to ensure that we have code reviews, to automate testing, and to easily generate documentation.

## Decision Drivers

* Testing will be easier and more consistent if it is automated
* Code style and quality will be more consistent if it is automated
* It will be easier to generate documentation if we automate the process

## Considered Options - Multiple Sections

* Linting and Code Style
    * Google
    * Airbnb
    * StandardJS
* Code Quality
    * Codeclimate
    * Codacy
    * Human review on pull requests
* Unit Tests
    * Jest
    * Tape
    * Ava
    * Cypress
    * Mocha/Chia
* Documentation Generation
    * JSDoc

## Decision Outcome

* Linting and Code Style: Choose Airbnb
* Code Quality: Choose manual PR review
* Unit Tests: Choose Jest
* Documentation Generation: Choose JSDoc

### Positive Consequences

* Linting will allow us to have automated code style enforcement
* Manual PR reviews will improve the quality of our code by getting another set of eyes on the code and performing sanity checks.

### Negative Consequences

* Fixing linting issues may slow us down and take a bit more time, at least in the short run
* Code reviews will take up time that team members could spend doing other tasks

## Pros and Cons of the Options: Linting

### [Airbnb](https://github.com/airbnb/javascript)

* Good, it's a 3rd party style so there are tools available that we can just plug and chug
    * ESLint
* Good, requires semicolons
* Bad, 3rd party style might be a bit restrictive

### [Google](https://google.github.io/styleguide/jsguide.html)

* Good, it's a 3rd party style so there are tools available that we can just plug and chug
    * ESLint
* Good, requires semicolons
* Bad, because no stance on destructuring
* Bad, 3rd party style might be a bit restrictive

### [StandardJS](https://standardjs.com/)

* Good, it's a 3rd party style so there are tools available that we can just plug and chug
    * ESLint
* Bad, because semicolons not required
* Bad, because trailing commas not allowed
* Bad, 3rd party style might be a bit restrictive

## Pros and Cons of the Options: Code Quality

### [Codeclimate](https://codeclimate.com/quality/)

* Good, because an automated solution can catch things that humans miss
* Bad, might be slightly overkill for our project
* Bad, not free for private repositories

### [Codacy](https://www.codacy.com/)

* Good, because an automated solution can catch things that humans miss
* Bad, might be slightly overkill for our project
* Bad, not free for private repositories

### Pull Request Review

* Good, because it is good to get another set of human eyes on the code
* Good, it is free
* Bad, because we might not catch everything ourselves
* Bad, there is the possibility of rubber-stamping and accepting code that might be bad
* Bad, it will take up time

## Pros and Cons of the Options: Testing

### [Jest](https://jestjs.io/)

* Good, most used, will probably have lots of documentation
* Good, zero setup
* Good, can test both frontend and backend?

### [Tape](https://github.com/substack/tape)

* Bad, less known

### [Ava](https://github.com/avajs/ava)

* Bad, less known

### [Cypress](https://www.cypress.io/)

* Bad, less known

### [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)

* Good, can test both frontend and backend
* Bad, seems to require a lot of setup

## Pros and Cons of the Options: Documentation Generation

### [JSDoc](https://jsdoc.app/)

* Good, we can generate documentation automatically alongside code
* Good, similar to javadoc in idea
