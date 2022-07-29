// Написать реализацию для Promise.all([promise1, promise2]) -> Promise<[result1, result2]>

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

// promiseAll([p1, p2, p3]).then(values => {
//   console.log(values);
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
function promiseAll(array) {
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


promiseAll([p1, p2, p3]).then((value) => {
    console.log(value);
}).catch((error) => {
    console.log('ERROR' + error);
})