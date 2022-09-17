export const p1 = Promise.resolve(1);
export const p2 = Promise.resolve(2);
export const p3 = Promise.resolve(3);

export const promise1 = Promise.resolve('3');
export const promise2 = Promise.resolve(42);
export const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});