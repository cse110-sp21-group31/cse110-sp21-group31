import {
    getDaysData,
    getCustomTagColor,
    addTask,
    addEvent,
    updateTaskChecked,
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

test('getCustomTagColor for tag that does not exist should return empty string', () => {
    expect(getCustomTagColor('nonexistentTag')).toBe('');
});

// TODO getCustomTagColor tests after some custom tags are added

// TODO tests to check for existence of custom tags after they are added

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
