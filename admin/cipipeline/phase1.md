# CI/CD Pipeline Phase 1

The basics of our pipeline are set up using Github Actions, as demonstrated in our Lab.

## Linting

Basic Linting set up using Airbnb style and ESLint. Code can be linted locally using `npm run li nt` which behind the scenes runs ESLint on all the JavaScript files in the repository (excluding `node_modules`). They are also run on every single push and pull request.

Our plans for the future include helping the rest of our team members get the appropriate extensions for Visual Studio Code (ESLint and Prettier) installed so that they can get their code formatted and linted on save, so that they can fix issues before they push to the repository.

## Unit Testing

Automated unit testing is set up for JavaScript files using Jest. Right now, the only test is a sample test defined in the file `source/sum.test.js` which tests the function defined in `source/sum.js`. These tests can be run locally with `npm run test` and they are also run on every single push and pull request.

Our plans for the future include integrating this with our actual codebase, and writing the unit tests to test our actual code base instead of just the sample test that we have defined right now as a proof of concept.

## Documentation Generation

Automated documentation generation is set up using JSDoc. The generated documentation website can be found in the `source/out` folder. Documentation can be generated locally with `npm run docs` and it is also generated (for the branch) on pushes and pull requests as well.

Our plans for the future of our automated documentation generation include hosting the documentation website somewhere else (for example, somewhere like GitHub Pages) so that the documentation is easily accessible.

## Code Quality

We were hoping to do code quality testing using something like Code Climate or Codacy, but the main issue that we ran into was that these are paid products for private repositories. So we decided to focus on the other aspects of the CI/CD pipeline for now and come back to it later once we  have a way to do free automated code quality review.

## Human PR Review

Once a push or pull request runs through each of the 3 stages of the build pipeline on GitHub, it needs to be approved by a team member before being merged into the main branch.

We were hoping to require pull request review before merging into the `main` branch. However, branch protection is a paid feature for private repositories such as ours, so we were unable to implement it. We will simply be relying on an honor system among the team, and we hope that it will be sufficient.

## Diagram of our current pipeline

![Diagram of our Pipeline](/admin/cipipeline/phase1.png)
