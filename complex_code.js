Filename: complex_code.js

/*
   This code is a complex implementation of a student management system.
   It includes various features like student registration, course enrollment,
   grade calculations, and report generation. The code is written in a modular
   and reusable manner, ensuring good code organization and scalability.
*/

// Student Class Definition
class Student {
  constructor(name, rollNumber, age, grade) {
    this.name = name;
    this.rollNumber = rollNumber;
    this.age = age;
    this.grade = grade;
    this.enrolledCourses = [];
  }

  enrollCourse(course) {
    this.enrolledCourses.push(course);
    console.log(`${this.name} has enrolled in ${course}.`);
  }

  calculateAverageGrade() {
    let totalGrade = 0;
    for (let course of this.enrolledCourses) {
      totalGrade += course.grade;
    }
    return totalGrade / this.enrolledCourses.length;
  }
}

// Course Class Definition
class Course {
  constructor(name, code, grade) {
    this.name = name;
    this.code = code;
    this.grade = grade;
  }
}

// Student Management System
class StudentManagementSystem {
  constructor() {
    this.students = [];
  }

  registerStudent(name, rollNumber, age, grade) {
    const student = new Student(name, rollNumber, age, grade);
    this.students.push(student);
    console.log(`${name} has been registered with roll number ${rollNumber}.`);
  }

  enrollStudentInCourse(rollNumber, course) {
    const student = this.students.find((s) => s.rollNumber === rollNumber);
    if (student) {
      student.enrollCourse(course);
    } else {
      console.log(`Student with roll number ${rollNumber} not found.`);
    }
  }

  generateReport() {
    console.log("-------- STUDENT REPORT --------");
    for (let student of this.students) {
      console.log(`Name: ${student.name}`);
      console.log(`Roll Number: ${student.rollNumber}`);
      console.log(`Age: ${student.age}`);
      console.log(`Enrolled Courses:`);
      for (let course of student.enrolledCourses) {
        console.log(`- ${course.name} (${course.code})`);
      }
      console.log(`Average Grade: ${student.calculateAverageGrade()}`);
      console.log("--------------------------------");
    }
  }
}

// Create an instance of the student management system
const sms = new StudentManagementSystem();

// Register students
sms.registerStudent("John Doe", "001", 18, "A+");
sms.registerStudent("Alice Smith", "002", 19, "A-");
sms.registerStudent("Bob Johnson", "003", 20, "B+");

// Enroll students in courses
sms.enrollStudentInCourse("001", new Course("Mathematics", "MATH101", 90));
sms.enrollStudentInCourse("001", new Course("Physics", "PHYS101", 85));
sms.enrollStudentInCourse("002", new Course("Chemistry", "CHEM101", 92));
sms.enrollStudentInCourse("003", new Course("Biology", "BIO101", 88));
sms.enrollStudentInCourse("003", new Course("Computer Science", "CS101", 95));

// Generate student report
sms.generateReport();