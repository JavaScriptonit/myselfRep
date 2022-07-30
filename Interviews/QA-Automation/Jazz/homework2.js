p1 = Promise.resolve(10);
p2 = Promise.resolve(20);
p3 = Promise.resolve(30);

// Promise.all([p1, p2, p3]).then((value) => {
//     console.log('success promises: ' + value);
// }).catch((error) => {
//     console.log('failed promises: ' + error);
// });

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


promiseAll1([p1, p2, p3]).then((value) => {
    console.log('success promises: ' + value);
}).catch((error) => {
    console.log('failed promises: ' + error);
});