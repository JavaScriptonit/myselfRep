// Example #1
const cars = ['BMW', 'Mercedes', 'Lada', 'ВАЗ', 'Mazda']

for (let i = 0; i < cars.length; i++) {
    console.log(1, i, cars[i]) // получить список значений массива
}

// Example #2
cars.forEach(car => {
    console.log(2, car) // получить список значений массива
})

// Example #3
// Array.prototype.vasily = function() {
//     return 'Vasily'
// }
// console.log(3, Array.prototype)

// Example #4
for (const index in cars) {
    if (index === '1') { // пропустить ключ '1'
        continue;
    }
    console.log(4, index, cars[index]) // получить список значений массива
}

// Example #5
for (const car of cars) {
    if (car === 'BMW') { // пропустить ключ '1'
        continue;
    }
    console.log(5, car) // получить список значений массива
}

// Example #6
const auto = {
    name: 'BMW',
    year: 2022,
    color: 'blue'
}

for (const key of Object.keys(auto)) {
    console.log(6, key) // получить список ключей объекта
}

// Example #7
for (const value of Object.values(auto)) {
    console.log(7, value) // получить список значений объекта
}