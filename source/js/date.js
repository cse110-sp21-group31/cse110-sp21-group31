

/**
getDaysKey
returns a string that represents the key that corresponds to the current date
@returns 2021-05-17
*/
function getDaysKey(now) {
    if (now === undefined) now = new Date();
    return [now.getFullYear(), now.getMonth()+1, now.getDate()].join('-');
}

/**
getName
@param: key of that day
@return: the name of that day "Thursday, May 13th"
*/
function getName(now) {
    if (now == undefined) now = new Date();
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
    let currentDayOfWeek = new Date(key+"T00:00:00").getDay();    
    
    let sundayTime = Date.now() - currentDayOfWeek * msPerDay;

    const result = [];
    for(i = 0; i < 7; i++) { // days of week
        let date = new Date(sundayTime + (i * msPerDay));
        result.push(getDaysKey(date));
    }
    return result;
}
