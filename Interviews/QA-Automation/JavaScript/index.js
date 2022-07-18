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

const getNames = () => {
    let arrayCharname = [];
    myArray.forEach((object) => {
        arrayCharname.push(object.charname + ' ' + object.surname);
    });
    console.log('Example #1', arrayCharname);
};

getNames();

const getTotalSalary = () => {
    let arraySalary = [];
    myArray.forEach((object) => {
        arraySalary.push(object.salary);
    });
    let totalSalary = arraySalary[0] + arraySalary[1] + arraySalary[2];
    console.log('Example #2', totalSalary);
};

getTotalSalary();

const getAllRoseSurname = () => {
    let arraySurname = [];
    myArray.forEach((object) => {
        if (object.surname === 'Rose') {
            arraySurname.push(object.charname);
        }
    });
    console.log('Example #3', arraySurname);
};

getAllRoseSurname();