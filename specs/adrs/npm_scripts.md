# `npm` Scripts and Other DevOps/CI/CD Information

## Author: Bryce Tsuyuki

## Introduction

You should be running these scripts before you push anything to GitHub. These are the same scripts that run through GitHub Actions for pull requests and commits to `main`. Thus, to avoid getting PRs rejected because the automated checks are not passing, make sure to run these locally and fix these issues locally.

Make sure you are in the `source` directory before running any of these.

Also make sure you have done `npm install` once you are in the `source` directory if you have not already done so. This will make sure ESLint, its rules, Prettier and its rules, and all the stuff for JSDoc and Jest gets installed so that you can run these scripts without issue.

## VSCode Extensions

- [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - This will automatically lint your code on save and highlight any issues that there might be
- [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - Prettier is an auto-formatter that runs on your code.
    - Please follow the instructions in the above extension webpage to set Prettier as your default code formatter.
    - At the very minimum, you will need to add the following to your `settings.json`:

```json
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
"editor.formatOnSave": true,
"prettier.singleQuote": true,
```

- These settings do the following:
    - Set Prettier as the formatter for all JS files
    - Allow Prettier to automatically format your files on save
    - Force Prettier to prefer single quotes when possible.
- To learn more about VSCode Settings, [click here](https://code.visualstudio.com/docs/getstarted/settings).
- To edit the VSCode `settings.json` instead of using the graphical user interface (which may be faster), press CTRL + SHIFT + P and then type "Open Settings" and select "Open Settings(JSON)" and you can paste in the JSON given above at the bottom.

## `npm run lint`

- This runs the linting through ESLint.
- Files that ESLint will ignore are defined in `source/.eslintignore`
- The configuration for ESLint is defined in `.eslintrc.json`.
- We are using Airbnb style.

## `npm run test`

- I believe that `npm test` also works to do the same here.
- Typically we will be putting tests in the `__tests__` folder (not created yet).
- Right now the only test that is being run is a dummy test for the `build/sum.js` file. This will change in the future.

## `npm run docs`

- This generates documentation using JSDoc.
- The output documentation is in `out`. I am working on hosting this documentation in a separate place.
    - This generates a website that you can actually open in your web browser and view. See `out/index.html`.
- Configuration for JSDoc is in `build/jsdocConf.json`.
- Please see the `build/jsDocDemo.js` file for a tutorial on how to add documentation to your code. The appropriate code snippet is below:

```js
/**
 * Print information representing a student. This function will print the values given.
 * @param {string} name - The name of the student.
 * @param {string} major - The student's major.
 * @param {number} gpa - The student's GPA.
 */
function returnStudentInfo(name, major, gpa) {
    return `${name} ${major} ${gpa}`;
}
```

- Note the `**` that starts the comment off. Without this, JSDoc will not be able to detect your comments.
- `@param` should be used to label the parameters of your function.
    - Then you give it an (optional) type (like `{string}`)
    - And then name the parameter and give it a description
- You can use `@example` to give an example of how the function should be used and what it would return in that case.
- More documentation about JSDoc can be found [here](https://jsdoc.app/).
