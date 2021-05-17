/**
 * Print information representing a student. This function will print the values given.
 * @param {string} name - The name of the student.
 * @param {string} major - The student's major.
 * @param {number} gpa - The student's GPA.
 */
function printStudentInfo(name, major, gpa) {
    console.log(`Name: ${name}`);
    console.log(`Major: ${major}`);
    console.log(`GPA: ${gpa}`);
}

printStudentInfo('Johnny Jenkins', 'Computer Science', 3.75);
