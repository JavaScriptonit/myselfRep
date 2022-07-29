// Написать реализацию для Promise.all([promise1, promise2]) -> Promise<[result1, result2]>

const p1 = Promise.resolve(10);
const p2 = Promise.resolve(20);
const p3 = Promise.resolve(30);

// Promise.all([p1, p2, p3]).then(values => {
//   console.log(values);
// });

// Выведет:
// [1, 2, 3]

// Решение без Promise.all:
const PromiseAll = ((array) => {
    return new Promise((resolve, reject) => {
        let results = [];
        let completed = 0;

        array.forEach((value, index) => {
            Promise.resolve(value).then(result => {
                results[index] = result;
                completed += 1;

                if (completed === array.length) {
                    resolve(results);
                }
            }).catch(err => reject(err));
        });
    });
});

PromiseAll([p1, p2, p3]).then((value) => {
    console.log("Success promises: " + value);
}).catch((error) => {
    console.log("Error promises: " + error);
});