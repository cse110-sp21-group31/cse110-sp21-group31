/**
 * Print information representing a student. This function will print the values given. This documentation was updated on Thursday, May 27.
 * @param {string} name - The name of the student.
 * @param {string} major - The student's major.
 * @param {number} gpa - The student's GPA.
 */
function returnStudentInfo(name, major, gpa) {
    return `${name} ${major} ${gpa}`;
}

returnStudentInfo('Billy Bob', 'Computer Science', 3.75);
