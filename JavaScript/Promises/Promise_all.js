// https://www.youtube.com/watch?v=DHvZLI7Db8E
// JavaScript Promises In 10 Minutes

const recordVideoOne = new Promise((resolve, reject) => {
    resolve('Video 1 Recorded')
})
const recordVideoTwo = new Promise((resolve, reject) => {
    resolve('Video 2 Recorded')
})
const recordVideoThree = new Promise((resolve, reject) => {
    resolve('Video 3 Recorded')
})

// Example #1 (Promise.all)

Promise.all([ // возвращает все 3 сообщения при resolve всех трёх Promise одновременно
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((messages) => {
    console.log(1, messages) // [ 'Video 1 Recorded', 'Video 2 Recorded', 'Video 3 Recorded' ]
})

// Example #2 (Promise.race)

Promise.race([ // возвращает только 1 сообщение 1го resolved Promise из списка
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((message) => {
    console.log(2, message) // Video 1 Recorded
})