// Написать реализацию для Promise.all([promise1, promise2]) -> Promise<[result1, result2]>

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

// Promise.all([p1, p2, p3]).then(values => {
//   console.log('Вывод через Promise.all: ', values);
// });

// Выведет:
// [1, 2, 3]


// const promiseAll = function(array) {
//     const resultArray = [];
//
//     array.forEach() => {
//         let promise = new Promise((resolve, reject) => {
//
//             if (!err) {
//                 // resolve(data);
//                 resultArray.push(resolve(data));
//             } else {
//                 reject(new Error('ERROR : ' + err));
//             }
//         }
//     })
//     return resultArray;
// }

// Решение Михаила:
function AndreyFunction(array) {
    return new Promise((resolve, reject) => {
        const results = [];
        let counter = 0;

        for (let i = 0; i < array.length; i++) {
            const p = array[i];

            p.then((value) => {
                results[i] = value;
                counter++;

                if (counter === array.length) {
                    resolve(results);
                }
            }).catch((error) => {
                reject(error);
            })
        }
    });
}


// AndreyFunction([p1, p2, p3]).then((value) => {
//     console.log('Вывод без Promise.all: ', value);
// }).catch((error) => {
//     console.log('ERROR' + error);
// })

const promise1 = Promise.resolve('3');
const promise2 = Promise.resolve(42);
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log('Вывод через Promise.all разных Promise: ', values);
}).catch((error) => {
    console.log('Promise.all ERROR: ' + error);
});

const promises = [promise1, promise2, promise3];

const ArtemFunction = (promises) => {
    promises.forEach((promise) => {
        return promise.then(() => console.log('ArtemFunction: ', promise)).catch((e) => console.log(`ArtemFunction Error: ${e}`));
    });
};

ArtemFunction(promises);

AndreyFunction([promise1, promise2, promise3]).then((value) => {
    console.log('AndreyFunction без Promise.all: ', value);
}).catch((error) => {
    console.log('AndreyFunction ERROR: ' + error);
})