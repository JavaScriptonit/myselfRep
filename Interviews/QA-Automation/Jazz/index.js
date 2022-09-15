// Написать реализацию для Promise.all([promise1, promise2]) -> Promise<[result1, result2]>

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

AndreyFunction(promises2).then((value) => {
    console.log('AndreyFunction без Promise.all: ', value);
}).catch((error) => {
    console.log('AndreyFunction ERROR: ' + error);
})