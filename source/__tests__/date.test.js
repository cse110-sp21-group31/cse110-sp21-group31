import { getName, getDaysKey } from '../js/date.js';

test('getName returns Thursday, June 3 for the date 6/3/2021', () => {
    const date = '2021-06-03';
    expect(getName(date)).toBe('Thursday, June 3');
});

test('getDaysKey gives the string 2021-05-17 for that Date', () => {
    const dateObj = new Date('2021-05-17T00:00:00');
    expect(getDaysKey(dateObj)).toBe('2021-05-17');
});

test('getDaysKey gives the string 2021-12-17 for that Date', () => {
    const dateObj = new Date('2021-12-17T00:00:00');
    expect(getDaysKey(dateObj)).toBe('2021-12-17');
});

test('getDaysKey gives the string 2021-12-05 for that Date', () => {
    const dateObj = new Date('2021-12-05T00:00:00');
    expect(getDaysKey(dateObj)).toBe('2021-12-05');
});
