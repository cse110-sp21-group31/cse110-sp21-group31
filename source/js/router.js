import { populate } from 'navigation.js';

function setState(dateKey, newState = true) {
    if (newState) {
        history.pushState({ key: dateKey }, '', '#' + dateKey);
    }

    //populate(dateKey);
}

window.onpopstate = function (event) {
    setState(event.state, false);
};
