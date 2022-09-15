// Нужно реализовать аналогичное решение для промисов без Promise.all.
// Нужна функция, которая будет получать на вход массив из промиссов и возвращать разрезолвленные промисы и выводить отдельно промисы, которые не разрезолвлены

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

const promise1 = Promise.resolve('3');
const promise2 = Promise.resolve(42);
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

const promises = [p1, p2, p3];
const promises2 = [promise1, promise2, promise3];

Promise.all(promises2).then((values) => { // Выведет: [1, 2, 3]
    console.log('Вариант через Promise.all: ', values);
}).catch((error) => {
    console.log('Promise.all Error: ' + error);
});

// Решение Артёма:

const ArtemFunction = (promises) => {
    const resolved = [];
    const rejected = [];
    promises.forEach((promise) => {
        promise.then((data) => resolved.push(data)).catch((e) => rejected.push(`myFn Error: ${e}`));
    });
    setTimeout(() => {
        switch (rejected.length === 0) {
            case true:
                console.log('Вариант через ArtemFunction: ', resolved);
                break;
            case false:
                console.log('ArtemFunction Error: ', rejected[0]);
        }
    }, 100);
};

ArtemFunction(promises2);