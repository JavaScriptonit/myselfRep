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

const promiseAll1 = ((array) => {
    return new Promise((resolve, reject) => {
        let results = [];
        let counter = 0;
        array.forEach((value, index) => {
            Promise.resolve(value).then((result) => {
                results[index] = result;
                counter ++;
                if (counter === array.length) {
                    resolve(results);
                }
            }).catch(() => {
              reject(value);
            })
        })
    });
});

const promiseAll2 = ((array) => {
    return new Promise((resolve, reject) => {
       let results = [];
       let counter = 0;
       array.forEach((value, index) => {
           Promise.resolve(value).then((result) => {
               results[index] = result;
               counter ++;
               if (counter === array.length) {
                   resolve(results)
               }
           }).catch((error) => {
               reject(error);
           });
       });
    });
});

const promiseAll3 = ((array) => {
   return new Promise((resolve, reject) => {
      let results = [];
      let counter = 0;

      for (let i = 0; i < array.length; i++) {
          array[i].then((result) => {
              counter ++;
              results[i] = result;
              if (counter === array.length) {
                  resolve(results);
              }
          }).catch((error) => {
              reject(error);
          });
      }
   });
});


promiseAll1(promises2).then((value) => {
    console.log('1) AndreyFunction без Promise.all: ', value);
}).catch((error) => {
    console.log('1) AndreyFunction ERROR: ' + error);
})

promiseAll2(promises2).then((value) => {
    console.log('2) AndreyFunction без Promise.all: ', value);
}).catch((error) => {
    console.log('2) AndreyFunction ERROR: ' + error);
})

promiseAll3(promises2).then((value) => {
    console.log('3) AndreyFunction без Promise.all: ', value);
}).catch((error) => {
    console.log('3) AndreyFunction ERROR: ' + error);
})