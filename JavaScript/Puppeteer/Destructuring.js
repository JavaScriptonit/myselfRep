//The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays,
// or properties from objects, into distinct variables.

// Example #1
let a, b, rest;
[a, b] = [10, 20];

console.log(a); // expected output: 10

console.log(b); // expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest); // expected output: Array [30,40,50]

// Example #2
const foo = ['one', 'two', 'three'];

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"

// Деструктуризация (destructuring assignment) – это особый синтаксис присваивания,
// при котором можно присвоить массив или объект сразу нескольким переменным, разбив его на части.

// Example #3
let options = {
    title: "Меню",
    width: 100,
    height: 200
};

let {title, width, height} = options;

console.log(title);  // Меню
console.log(width);  // 100
console.log(height); // 200

// Example #4
// Данная переменная styles содержит { borderColor: 'rgb(240, 62, 62)' }, данный объект можно сравнивать с Ожидаемым результатом в "it"
// const styles = await page.evaluate((selectors) => { // === { borderColor: 'rgb(240, 62, 62)' }
//     const elem = document.querySelector('.class') // селетор, из которого нужно вытянуть styles {borderColor}
//     const {borderColor} = window.getComputedStyle(elem) // getComputedStyle() method is always called on the window with the element as a parameter, and returns an object of properties
//     return {borderColor}; // если убрать {} то метод возвращает все стили элемента. Через запятую можно запросить нужные стили, например, { borderColor: 'rgb(240, 62, 62)', fontSize: '14px' }
// }, selectors);