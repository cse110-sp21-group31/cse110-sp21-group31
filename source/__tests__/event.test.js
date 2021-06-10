import Event from '../js/components/event.js';

test('Test 12 to 24 Function - 12:05 AM', () => {
    const originalTime = '12:05 AM';
    const converted = Event.convert12To24(originalTime);

    expect(converted).toBe('00:05');
});

test('Test 12 to 24 Function - 11:06 AM', () => {
    const originalTime = '11:06 AM';
    const converted = Event.convert12To24(originalTime);

    expect(converted).toBe('11:06');
});

test('Test 12 to 24 Function - 1:27 PM', () => {
    const originalTime = '01:27 PM';
    const converted = Event.convert12To24(originalTime);

    expect(converted).toBe('13:27');
});

test('Test 12 to 24 Function - 11:49 PM', () => {
    const originalTime = '11:49 PM';
    const converted = Event.convert12To24(originalTime);

    expect(converted).toBe('23:49');
});
