# Onboarding Documentation

So you want to contribute to this project! Welcome to the team, let's get you oriented.

## Repo Structure

- `.github` contains the configuration for GitHub Actions. This is used to run automated tests whenever code is committed to the `main` branch
- `admin` contains all things that are not immediately necessary to the app itself. Most of this is related to running the team itself.
    - `branding` contains some stuff relevant to our team's identity.
    - `cipipeline` documents the evolution of our CI/CD pipeline
    - `meetings` contains our meeting notes. This includes Sprint Plannings, Sprint Reviews, Retrospectives, and any other meetings we may have.
    - `misc` contains our team rules as well as this Onboarding document.
    - `retrospective` contains some documents related to our retrospectives.
    - `videos` contains some videos related to our product.
    - Feel free to create a PR adding yourself to `team.md` once you join the team!
- `source` contains the actual source code for our website.
    - `__tests__` contains all of the tests. We use Jest to run our tests.
    - `ci-cd` contains some configuration and demo files for our CI/CD pipeline.
    - `images` contains any icons and images that are used in our repository.
    - `js` contains all of the JavaScript necessary to make our application work.
        - `components` contains the definitions of the components that are used in our application. We use Web Components.
    - `out` contains the generated JSDoc documentation. See the following for more details:
        - [NPM Scripts Docs](../../specs/adrs/npm_scripts.md)
        - [DevOps Pipeline Docs](../../specs/adrs/devops_pipeline.md)
- `specs` contains the specifications for our project.
    - `adrs` contains the Architectural Decision Records for our projects. We have ADRs for most of our major decisions.
    - `brainstorm` contains some documents related to brainstorming on Miro.
    - `figma` contains some snapshots of our Figma board for design.
    - `pitch` contains some documents related to our initial pitch.
- Check out [`README.md`](../../README.md) for more useful links, to our Miro Board, Figma doc, our deployed application and documentation sites, and more.

## Cloning the Repository

Navigate to where you want to clone the repository, then run

```bash
git clone git@github.com:cse110-sp21-group31/cse110-sp21-group31.git
```

if you have SSH configured with Git, or if not, run:

```bash
git clone https://github.com/cse110-sp21-group31/cse110-sp21-group31.git
```

After you do this, you navigate to the `source` folder and then run `npm install` to get all of our dependencies installed.

To get set up properly, you may also want to review [NPM Scripts Docs](../../specs/adrs/npm_scripts.md) for information on the Visual Studio Code scripts you will need (ESLint and Prettier)

## Building the App

Our application does not need any building! That means that running it is super easy. You can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code or you can just open the HTML files. `daily_log.html` contains our Daily Log and `weekly_log.html` contains the Weekly Log.

## Running Unit Tests

Before you run this for the first time, you will need to run `npm install` inside the `source` folder if you have not already done so.

Ensure that you are inside the `source` folder, then run `npm run test`. This will run the unit tests that are stored in `source/__tests__`. For more details, see [NPM Scripts Docs](../../specs/adrs/npm_scripts.md).

## Building Documentation

Before you run this for the first time, you will need to run `npm install` inside the `source` folder if you have not already done so.

Ensure that you are inside the `source` folder, then run `npm run docs`. This will use JSDoc to generate documentation that is stored in `source/out`. For more details, see [NPM Scripts Docs](../../specs/adrs/npm_scripts.md).
