import { convert24To12 } from '../js/button_controller.js';

test('Test 24 to 12 function - 12:05 AM', () => {
    const originalTime = '00:05';
    const converted = convert24To12(originalTime);

    expect(converted).toBe('12:05 AM');
});

test('Test 24 to 12 function - 11:06 AM', () => {
    const originalTime = '11:06';
    const converted = convert24To12(originalTime);

    expect(converted).toBe('11:06 AM');
});

test('Test 24 to 12 function - 1:27 PM', () => {
    const originalTime = '13:27';
    const converted = convert24To12(originalTime);

    expect(converted).toBe('01:27 PM');
});

test('Test 24 to 12 function - 11:49 PM', () => {
    const originalTime = '23:49';
    const converted = convert24To12(originalTime);

    expect(converted).toBe('11:49 PM');
});
