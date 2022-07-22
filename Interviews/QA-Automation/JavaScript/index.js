// Connection to SQL DB with Cypress
// cy.sqlServer('SELECT Email FROM [MyDB].[dbo].[User] WHERE Name ="test"');

// Example #1
const myArray = [{
    "charname": 'John',
    "gender": 'Male',
    "surname": 'Rose',
    "salary": 100,
}, {
    "charname": 'Margo',
    "gender": 'Female',
    "surname": 'Rose',
    "salary": 1200,
}, {
    "charname": 'Lisa',
    "gender": 'Male',
    "surname": 'Barcley',
    "salary": 1600,
}];

// 1ый вариант решения задач:
const getNames = () => {
    let arrayCharname = [];
    myArray.forEach((object) => {
        arrayCharname.push(object.charname + ' ' + object.surname);
    });
    console.log('Example #1', arrayCharname); // [ 'John Rose', 'Margo Rose', 'Lisa Barcley' ]
};

getNames();

const getTotalSalary = () => {
    let arraySalary = [];
    myArray.forEach((object) => {
        arraySalary.push(object.salary);
    });
    let totalSalary = arraySalary[0] + arraySalary[1] + arraySalary[2];
    console.log('Example #2', totalSalary); // 2900
};

getTotalSalary();

const getAllRoseSurname = () => {
    let arraySurname = [];
    myArray.forEach((object) => {
        if (object.surname === 'Rose') {
            arraySurname.push(object.charname);
        }
    });
    console.log('Example #3', arraySurname); // [ 'John', 'Margo' ]
};

getAllRoseSurname();

// 2ой вариант решения задач:
const getNamesShortcut = (arr) => {
    console.log('Example #1', arr.map(el => `${el.surname} ${el.charname}`)); // [ 'Rose John', 'Rose Margo', 'Barcley Lisa' ]
    return arr.map(el => `${el.surname} ${el.charname}`);
};

getNamesShortcut(myArray);

const getTotalSalaryShortcut = (arr) => {
    console.log('Example #2', arr.reduce((acc, curr) => acc + curr.salary, 0)); // 2900
    return arr.reduce((prev, curr) => prev + curr.salary, 0);
};

getTotalSalaryShortcut(myArray);

const getAllRoseSurnameShortcut = (arr) => {
    console.log('Example #3', arr.filter(object => object.surname === 'Rose').map(el => el.charname)); // [ 'John', 'Margo' ]
    return arr.filter(object => object.surname === 'Rose').map(el => el.charname);
};

getAllRoseSurnameShortcut(myArray);

// number of unique surnames:
function uniqueSurname(arr) {
    let unique = new Set();
    arr.map(el => unique.add(el.surname));
    console.log('Example #4', unique.size); // 2
    return unique;
}

uniqueSurname(myArray);

// The Set object lets you store unique values of any type, whether primitive values or object references.
// Set objects are collections of values. A value in the Set may only occur once; it is unique in the Set's collection.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

// 3ий вариант решения задач:
const getNameAndSurname = (arr) => arr.map(e => `${e.surname} ${e.charname}`);
console.log('Example #1', getNameAndSurname(myArray));

const getTotalAmountOfSalaries = (arr) => arr.reduce((a, b) => a + b.salary, 0);
console.log('Example #2', getTotalAmountOfSalaries(myArray));

const getNamesWithRoseSurname = (arr) => arr.filter(e => e.surname === 'Rose').map(e => e.charname);
console.log('Example #3', getNamesWithRoseSurname(myArray));

const getCountOfUniqueSurnames = (arr) => new Set(arr.map(e => e.surname)).size;
console.log('Example #4', getCountOfUniqueSurnames(myArray));
