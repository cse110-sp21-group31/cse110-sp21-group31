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
        ['0', now.getMonth() + 1].join('').slice(-2),
        ['0', now.getDate()].join('').slice(-2),
    ].join('-');
}
/**
 * SUBJECT TO CHANGE:
 * Takes current title of the day, parses it into usable date key
 * @param {string} name "Wednesday, June 2"
 */
function parseName(name) {
    const now = new Date();
    const nameSub = name.substr(name.indexOf(',') + 2, name.length - 1);

    // month and date names
    const month = nameSub.split(' ')[0];
    let date = nameSub.split(' ')[1];

    const months = {
        January: '01',
        February: '02',
        March: '03',
        April: '04',
        May: '05',
        June: '06',
        July: '07',
        August: '08',
        September: '09',
        October: '10',
        November: '11',
        December: '12',
    };
    if (date < 10) {
        date = ['0', date].join('');
    }
    return [now.getFullYear(), months[month], date].join('-');
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

export { getDaysKey, getName, parseName };
