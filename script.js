"use strict";
const marksValue = 5;
const studentsValue = prompt('Enter the number of students:');

function getStudentsList(studentsValue) {
    let studentsList = [];
    for (let i = 0; i < studentsValue; i++ ) {
        studentsList[i] = {
            name: prompt(`Enter ${i+1} student\'s name`),
            marks: getMarksArr(marksValue),
        }
    }
    console.table(studentsList);
    return studentsList;
};
let studentsList = getStudentsList(studentsValue);

// ***** Генерация масива оценок
function getMarksArr(marksValue) {
    let marks = []
    for (let i = 0; i < marksValue; i++) {
        marks[i] = getRandomInt(0, 13);
    }
    return marks;
}
const marks = getMarksArr(marksValue);


// ***** Генерация случайной оценки от 0 до 12
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

  // ******** Нахождение средней оценки для каждого студента и вывод нового списка студентов
function getAvgRate(someStudentsList) {
    for (let student of someStudentsList) {
        let sumMarks = 0;
        for (let k = 0; k < marksValue; k++) {
            sumMarks += student.marks[k];
        };
        student.avgRate = Math.trunc(sumMarks / student.marks.length * 100) / 100; 
    }
    return someStudentsList;
}
let students = getAvgRate(studentsList);

function main() {  

    do {
        // *****  Предлагаем пользователю выбрать операцию с массивом
        
        const operation = +prompt(`Choose your operation:
        1. Find best student
        2. Grade list
        3. Average mark
        4. Debtors list
        5. Add new student
    `);

        switch (operation) {
            case 1:
                console.table(studentsList);
                console.table(`The best student is ${getBestStudent(students)}`);
                break;
            case 2:
                // console.table(studentsList);
                console.log(`Sorted students grade list:`)
                console.table(getSortedGradeList(students));
                break;
            case 3:
                console.log(`Students list with average marks:`)
                console.table(getAvgRate(students));
                break;
            case 4:
                console.table(studentsList);
                console.log(`Debtors list:`)
                console.table(getDebtors(students));
                break;
            case 5:
                console.table(studentsList);
                console.log(`Students list with a new student:`)
                console.table(getNewStudent(students));
                break;
            default:
                alert('Wrong input value')
        }

        //   ******** Поиск лучшего студента по среднему баллу:
        function getBestStudent(students) {
        let bestStudent = students[0];
        for (let i = 1; i < students.length; i++) {
            if (bestStudent.avgRate < students[i].avgRate)
                bestStudent = students[i];
        }
        return bestStudent.name;
    }

        // *****  Список должников
        function getDebtors(students) {
            let debtors = [];
            for (let student of students) {
                if (student.avgRate < 5)
                    debtors[debtors.length] = student;
            }
            return debtors;
        }

        //  Сортировка студентов по успеваемости
        function getSortedGradeList(students) {
            for (let k = 0; k < students.length; k++) {
                for (let i = 0; i < students.length - 1 - k; i++) {
                    if (students[i].avgRate < students[i + 1].avgRate) {
                        const buff = students[i];
                        students[i] = students[i + 1];
                        students[i + 1] = buff;
                    }
                }
            }
            return students;
        }

        // ***** Новенький:
        function getNewStudent(students) {
            let newStudent = {};
            newStudent.name = prompt('Enter new student\'s name');
            // newStudent.marks = [];
            newStudent.marks = getMarksArr(marksValue);
            let sum = 0;
            for (let mark of marks ) {
                sum += mark;
            }
            newStudent.avgRate = Math.trunc(sum / marksValue * 100) / 100;
            students[students.length] = newStudent;
            return students;
        }

    } while (confirm('Do you want to continue operations?'));
}

main();






