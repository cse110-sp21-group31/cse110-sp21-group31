import { getDaysKey } from './date.js';
import { populate } from './navigation.js';

function setState(dateKey, newState = true) {
    if (newState) {
        history.pushState({ key: dateKey }, '', '#' + dateKey);
    }
    window.curDate = new Date(`${dateKey  }T00:00:00`);
    populate(dateKey);
}

window.onpopstate = function (event) {
    if (event.state != null) setState(event.state.key, false);
};

export { setState };

// side bar navigate
document.querySelectorAll('#mySidebar small a').forEach((item) => {
    item.onclick = function (event) {
        event.preventDefault();
        setState(getDaysKey(new Date(this.innerText)));
        document.querySelector('.closebtn').onclick(event);
    };
});
