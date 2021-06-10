/**
 * ex: 12:00 AM
 * returns 0
 * @param {string} time
 */
function minutesSinceMidnight(time) {
    const colon = time.indexOf(':');
    const hours = parseInt(time.slice(0, colon), 10) % 12;
    const minutes = parseInt(time.substr(colon + 1, 3), 10);
    const ampm = time.slice(-2);

    let result = hours * 60 + minutes;
    if (ampm === 'PM' || ampm === 'pm') result += 12 * 60;

    return result;
}

function sortPoints(a, b) {
    if (a.val === b.val) return a.from ? 1 : -1;
    return a.val - b.val;
}

/**
 *
 * @param {array of event objects} eventArr
 * @return array of integers that represent width
 */
function getEventWidths(eventArr) {
    // populate useful data structures

    const events = []; // store array of events converted to number times
    const res = []; // array of objects of width and left percentage of each event
    const storeInd = []; // store the index
    const points = []; // store the starting and ending points of each event
    const n = eventArr.length;

    for (let i = 0; i < n; i += 1) {
        res.push({
            left: 0,
            width: 100,
        });

        const fromNum = minutesSinceMidnight(eventArr[i].from);
        const toNum = minutesSinceMidnight(eventArr[i].to);

        events.push({
            from: fromNum,
            to: toNum,
            ind: i,
        });

        points.push({
            ind: i,
            from: true,
            val: fromNum,
        });

        points.push({
            ind: i,
            from: false,
            val: toNum,
        });

        storeInd.push(0);
    }

    points.sort(sortPoints);

    // get the width of each event
    // sort by event end time and use greedy to assign lane indexes for each event
    // then for every event find all overlapping indices
    let lastInd = 0;
    let visitedIndices = 0;
    let laneCount = 0;
    const lane = [];
    const vis = [];
    for (let i = 0; i < n; i += 1) {
        lane.push(0);
        vis.push(false);
    }

    while (visitedIndices < n) {
        lastInd = 0;
        for (let i = 0; i < 2 * n; i += 1) {
            const index = points[i].ind;
            if (!points[i].from && !vis[index]) {
                if (events[index].from >= lastInd) {
                    lastInd = events[index].to;
                    vis[index] = true;
                    visitedIndices += 1;
                    lane[index] = laneCount;
                }
            }
        }
        laneCount += 1;
    }

    for (let i = 0; i < n; i += 1) {
        const countIntersects = new Set();
        for (let j = 0; j < n; j += 1) {
            // break if is myself or is not intercepting this event
            let cont = false;
            if (i === j) cont = true;
            if (events[i].to <= events[j].from) cont = true;
            if (events[i].from >= events[j].to) cont = true;

            if (!cont) countIntersects.add(lane[j]);
        }
        countIntersects.delete(lane[i]);
        res[i].width = 100 / (countIntersects.size + 1);
    }

    // get the left of each event
    // loop through each event
    const possibleLeft = new Set();
    for (let i = 0; i < points.length; i += 1) {
        const index = points[i].ind;

        if (points[i].from) {
            // find first thing that doesn't exist in set
            let count = 0;
            while (possibleLeft.has(count) === true) count += 1;
            possibleLeft.add(count);

            // set left
            res[index].left = count * res[index].width;

            // update vars
            storeInd[index] = count;
        } else {
            // processing the end of this event
            possibleLeft.delete(storeInd[index]);
        }
    }

    return res;
}

function test(run = false) {
    if (!run) return;
    const events = [
        {
            from: '5:00 AM',
            to: '10:00 AM',
        },
        {
            from: '6:00 AM',
            to: '9:00 AM',
        },
        {
            from: '7:00 AM',
            to: '11:00 AM',
        },
        {
            from: '10:00 AM',
            to: '12:00 PM',
        },
    ];
    getEventWidths(events);
}

test();
