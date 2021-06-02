/**
getDaysKey

returns a string that represents the key that corresponds to the current date
@returns 2021-05-17
*/
function getDaysKey(dateObj) {
    let now;
    if (dateObj === undefined) now = new Date();
    else now = dateObj;
    return [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
}

/**
getName
@param: key of that day
@return: the name of that day "Thursday, May 13th"
*/
function getName(dateObj) {
    let now;
    if (dateObj === undefined) now = new Date();
    else now = dateObj;
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
}

/**
getWeek
@param key: input day key
@return: an array of keys for each day in the week that key belongs in
*/
function getWeek(key) {
    const msPerDay = 24 * 60 * 60 * 1000;

    // this defaults to browser timezone
    // monday is 1
    const currentDayOfWeek = new Date(`${key}T00:00:00`).getDay();

    const sundayTime = Date.now() - currentDayOfWeek * msPerDay;

    const result = [];
    for (let i = 0; i < 7; i += 1) {
        // days of week
        const date = new Date(sundayTime + i * msPerDay);
        result.push(getDaysKey(date));
    }
    return result;
}

/**
temporary test function to satisfy linter
*/
function test() {
    getName();
    getWeek(getDaysKey());
}

test();

export { getDaysKey, getName };