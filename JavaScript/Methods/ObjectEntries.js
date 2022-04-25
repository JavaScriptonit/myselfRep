// Object.entries(obj) – возвращает массив пар [ключ, значение].
// Разбитие объекта на маленькие массивы внутри большого массива:

// Example #1
const objectExample1 = { b: 2, c: 3 }
console.log(1, Object.entries(objectExample1)) // [ [ 'b', 2 ], [ 'c', 3 ] ]

// Example #2
// iterate through key-value gracefully
const objectExample2 = { a: 5, b: 7, c: 9 };
let resultArray = []
for (const [key, value] of Object.entries(objectExample2)) {
    console.log('2.1', `['${key}', ${value}]`); // ['a', 5]
    resultArray.push(`['${key}', ${value}]`)
}
console.log(2, resultArray) // [ "['a', 5]", "['b', 7]", "['c', 9]" ]

// Example #3
// Or, using array extras
const objectExample3 = { a: 5, b: 7, c: 9 };
Object.entries(objectExample3).forEach(([key, value]) => {
    console.log('3.1', `${key} ${value}`); // "a 5", "b 7", "c 9"
});

// Example #4
let user = {
    name: "John",
    age: 30
};
console.log(4, Object.keys(user)) // = ["name", "age"]
console.log('4.1', Object.values(user)) // = ["John", 30]
console.log('4.2', Object.entries(user)) // = [ ["name","John"], ["age",30] ]