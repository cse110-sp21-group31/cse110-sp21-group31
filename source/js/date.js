/**
getDaysKey

returns a string that represents the key that corresponds to the current date
@returns 2021-05-17
*/
function getDaysKey(dateObj) {
    let now;
    if (dateObj === undefined) now = new Date();
    else now = dateObj;
    return [
        now.getFullYear(),
        `0${now.getMonth() + 1}`.slice(-2),
        `0${now.getDate()}`.slice(-2),
    ].join('-');
}

/**
getName
@param: key of that day
@return: the name of that day "Thursday, May 13th"
*/
function getName(key) {
    let now;
    if (key === undefined) now = new Date(`${getDaysKey()}T00:00:00`);
    else now = new Date(`${key}T00:00:00`);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
}

/**
getWeek
@return: an array of keys for each day in the week that key belongs in
*/
function getWeek() {
    const currentDayOfWeek = window.curDate.getDay();
    const date = new Date();
    date.setDate(window.curDate.getDate() - currentDayOfWeek);

    const result = [];
    for (let i = 0; i < 7; i += 1) {
        result.push(getDaysKey(date));
        date.setDate(date.getDate() + 1);
    }

    return result;
}

/**
temporary test function to satisfy linter
*/
function test(arg = true) {
    if (arg) return;
    getName();
    getWeek(getDaysKey());
}

test();

export { getDaysKey, getName, getWeek };
