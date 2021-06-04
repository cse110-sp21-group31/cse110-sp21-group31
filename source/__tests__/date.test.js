import { getName, getDaysKey } from '../js/date.js';

test('getName returns Thursday, June 3 for the date 6/3/2021', () => {
    const date = '2021-06-03';
    expect(getName(date)).toBe('Thursday, June 3');
});

test('getDaysKey gives the day', () => {
    const dateObj = new Date('2021-05-17T00:00:00');
    expect(getDaysKey(dateObj)).toBe('2021-05-17');
});
