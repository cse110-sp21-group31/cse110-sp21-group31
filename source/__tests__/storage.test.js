import {
    getDaysData,
    getCustomTagColor,
    addTask,
    addEvent,
    updateTaskChecked,
    addCustomTagStorage,
    getCustomTags,
} from '../js/storage.js';

// define variables that will be used throughout this test suite
const daysKey = '2021-06-03';
const event1Json = {
    content: 'CSE 110 Lecture',
    tags: 'Lecture',
    from: 1621308663,
    to: 1621367364,
};
const event2Json = {
    content: 'CSE 110 Group Meeting',
    tags: 'UCSD',
    from: 1621309663,
    to: 1621369964,
};
const task1Json = {
    content: 'Go on a run',
    completed: false,
    tags: ['Other'],
};
const task2Json = {
    content: 'Finish homework',
    completed: false,
    tags: ['UCSD'],
};

test('getCustomTagColor for tag that does not exist should return empty string - before any tags are added', () => {
    expect(getCustomTagColor('nonexistentTag')).toBe('');
});

test('addEvent is successful creating the first event of the day', () => {
    expect(addEvent(daysKey, event1Json)).toBe(true);
});

test('addEvent is successful creating the second event of the day', () => {
    expect(addEvent(daysKey, event2Json)).toBe(true);
});

test('addTask is successful creating the first task of the day', () => {
    expect(addTask(daysKey, task1Json)).toBe(true);
});

test('addTask is successful creating the second task of the day', () => {
    expect(addTask(daysKey, task2Json)).toBe(true);
});

test('getDaysData returns the data for the specified day', () => {
    const dayData = getDaysData(daysKey);
    expect(dayData.events).toContainEqual(event1Json);
    expect(dayData.events).toContainEqual(event2Json);
    expect(dayData.tasks).toContainEqual(task1Json);
    expect(dayData.tasks).toContainEqual(task2Json);
});

test('updateTaskChecked updates the completion status of the task successfully - incomplete to complete', () => {
    updateTaskChecked(daysKey, 0, true);
    const dayData = getDaysData(daysKey);
    expect(dayData.tasks[0].completed).toBe(true);
});

test('updateTaskChecked does not touch the other task', () => {
    const dayData = getDaysData(daysKey);
    expect(dayData.tasks[1].completed).toBe(false);
});

test('updateTaskChecked updates the completion status of the task successfully', () => {
    updateTaskChecked(daysKey, 0, false);
    const dayData = getDaysData(daysKey);
    expect(dayData.tasks[0].completed).toBe(false);
});

test('addCustomTagStorage adds one tag successfully', () => {
    addCustomTagStorage('testTag1');
    const tagData = getCustomTags();
    expect(tagData.testTag1).toBe('red');
});

test('addCustomTagStorage adds multiple tags successfully', () => {
    addCustomTagStorage('testTag2');
    let tagData = getCustomTags();
    expect(tagData.testTag2).toBe('blue');

    addCustomTagStorage('testTag3');
    tagData = getCustomTags();
    expect(tagData.testTag3).toBe('pink');
});

test('addCustomTagStorage loops around to the beginning of the color list', () => {
    // these 3 tags are added so we have enough tags to loop around
    addCustomTagStorage('testTag4');
    let tagData = getCustomTags();
    expect(tagData.testTag4).toBe('green');

    addCustomTagStorage('testTag5');
    tagData = getCustomTags();
    expect(tagData.testTag5).toBe('violet');

    addCustomTagStorage('testTag6');
    tagData = getCustomTags();
    expect(tagData.testTag6).toBe('orange');

    // this is the loop around case
    addCustomTagStorage('testTag7');
    tagData = getCustomTags();
    expect(tagData.testTag7).toBe('red');
});

test('addCustomTagStorage does not change the color of an existing tag', () => {
    // testTag6 previously was defined and given an orange color above (that's the expected behavior).
    // re-adding it should NOT change that
    addCustomTagStorage('testTag6');
    const tagData = getCustomTags();
    expect(tagData.testTag6).toBe('orange');
});

test('getCustomTagColor returns proper colors for tags that exist', () => {
    let color = getCustomTagColor('testTag6');
    expect(color).toBe('orange');

    color = getCustomTagColor('testTag1');
    expect(color).toBe('red');
});

test('getCustomTagColor for tag that does not exist should return empty string - after some tags are added', () => {
    expect(getCustomTagColor('nonexistentTag2')).toBe('');
});
