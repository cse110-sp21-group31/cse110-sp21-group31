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

/**
 * helper function for Array.sort()
 * @param {point obj} a
 * @param {point obj} b
 * @returns
 */
function sortPoints(a, b) {
    if (a.val === b.val) return a.from ? 1 : -1;
    return a.val - b.val;
}

/**
 * returns if events a and b intercept
 * @param {event obj} a
 * @param {event obj} b
 */
function eventsIntercept(a, b) {
    if (a.to <= b.from) return false;
    if (a.from >= b.to) return false;
    return true;
}
/**
 * returns if rects a and b intercept
 * @param {rect obj} a
 * @param {rect obj} b
 */
function rectsIntercept(a, b) {
    if (!eventsIntercept(a, b)) return false;
    const newA = { from: a.left, to: a.right };
    const newB = { from: b.left, to: b.right };
    return eventsIntercept(newA, newB);
}

/**
 *
 * @param {array} - event objects eventArr
 * @return array of integers that represent width
 */
function getEventWidths(eventArr) {
    // populate useful data structures
    // events stores array of events with from and to converted to numbers
    const events = [];
    // res is the array of objects of width and left percentages that we return
    const res = [];
    // points stores the sorted an array of points of every event, 2 per event
    const points = [];

    const n = eventArr.length;
    for (let i = 0; i < n; i += 1) {
        res.push({ left: 0, width: 100 });
        const fromNum = minutesSinceMidnight(eventArr[i].from);
        const toNum = minutesSinceMidnight(eventArr[i].to);
        events.push({ from: fromNum, to: toNum, ind: i });
        points.push({ ind: i, from: true, val: fromNum });
        points.push({ ind: i, from: false, val: toNum });
    }

    points.sort(sortPoints);

    // get width
    // sort by event end time and greedily assign
    // as many non-intercepting events in this lane
    // then repeat to the next lane
    let lastInd = 0; // used to check for intersection
    let visitedIndices = 0; // total # of visited events
    let laneCount = 0; // total # of lanes
    const lane = []; // array that maps event index to lane index
    const vis = []; // array that maps event index to processed or not
    for (let i = 0; i < n; i += 1) {
        lane.push(0);
        vis.push(false);
    }

    while (visitedIndices < n) {
        lastInd = 0;
        for (let i = 0; i < points.length; i += 1) {
            const index = points[i].ind;
            if (
                points[i].from && // process events by order of starting position
                !vis[index] && // visited flag of this event must be false
                events[index].from >= lastInd // whether or not intercepted
            ) {
                // add this event to the current lane laneCount
                lane[index] = laneCount;

                // update vars
                lastInd = events[index].to;
                vis[index] = true;
                visitedIndices += 1;
            }
        }
        laneCount += 1;
    }

    // get left margin percentage
    // loop over all pairs of events
    // if they intersect, jot down their lane indexes
    // the unique number of lane indexes jotted down
    // is the denominator of the final width
    for (let i = 0; i < n; i += 1) {
        const countIntersects = new Set();
        for (let j = 0; j < n; j += 1) {
            if (i !== j && eventsIntercept(events[i], events[j]))
                countIntersects.add(lane[j]);
        }

        // delete the currant lane index
        // bc just 1 event by itself would have
        // no intersections
        countIntersects.delete(lane[i]);

        // store the denominator of the percentage of screen
        // this event should take, to use later
        res[i].width = countIntersects.size + 1;
    }

    // get the left of each event
    // set them sequentially by end time
    // try all positions and sees if it intersects
    // with the events before it

    const rects = []; // stores the running array of events that are placed down

    for (let i = 0; i < points.length; i += 1) {
        const index = points[i].ind;

        if (!points[i].from) {
            // loop over all possible left positions
            // to see which one doesn't intersect with
            // previous events
            let count = 0;
            let testRect = {};
            const numInt = res[index].width;
            const rectWidth = 100 / numInt;
            for (; count < numInt; count += 1) {
                // update the test rectangle that represents
                // the collision box of this event
                testRect = {
                    from: events[index].from,
                    to: events[index].to,
                    left: count * rectWidth,
                    right: (count + 1) * rectWidth,
                };

                // check if putting test rect
                // intersect with any previous events
                let intersect = false;
                for (let j = 0; j < rects.length; j += 1) {
                    if (rectsIntercept(testRect, rects[j])) {
                        intersect = true;
                        break;
                    }
                }

                if (!intersect) break;
            }

            // debug statements for testing
            if (count === numInt) {
                console.log('nowhere to put event without intersection');
                count = 0;
            }

            // place the rectangle and update res to return
            rects.push(testRect);
            res[index].left = testRect.left;
            res[index].width = rectWidth;
        }
    }

    return res;
}

function test(run = false) {
    if (!run) return;
    const events = [
        {
            from: '1:44 AM',
            to: '6:44 AM',
        },
        {
            from: '1:44 AM',
            to: '6:44 AM',
        },
    ];
    console.log(getEventWidths(events));
}

test(false);

export default getEventWidths;
