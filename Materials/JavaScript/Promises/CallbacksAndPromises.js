// https://www.youtube.com/watch?v=DHvZLI7Db8E
// JavaScript Promises In 10 Minutes
// Удобно использовать для отображения ошибки Пользователю после длительного процесса (например скачивания файла),
// Если файл не был скачен - отобразить ошибку reject Promise

let p = new Promise((resolve, reject) => { // у Promise есть 2 результата: если Promise успешно закончен или failed
    let a = 1 + 1  // сам Promise, если он будет зафейлен - функция выполняет reject часть
    if (a === 2) { //
        resolve('Success') // pass the message Success
    } else {
        reject('Failed') // pass the message Failed
    }
})

p.then((message) => { // в .then ловим ответ при resolve Promise
    // console.log('This is in the then ' + message) // выводим в консоль если Success
}).catch((message) => { // только в .catch() можем поймать (catch error) reject Promise
    // console.log('This is in the catch ' + message) // выводим в консоль если Fail
})

const userLeft = false;
const userWatchingCatMeme = false;

// Example 1 (with Callbacks)

function watchTutorialCallback(callback, errorCallback) {
    if (userLeft) {
        errorCallback({
            name: 'User left',
            message: ';('
        })
    } else if (userWatchingCatMeme) {
        errorCallback({
            name: 'User Watching Cat Meme',
            message: 'WebDevSimplified < Cat'
        })
    } else {
        callback('Thumbs up and Subscribe')
    }
}

watchTutorialCallback((message) => { // у функции 2 колбэка: для success и error
    console.log('Success: ' + message)
}, (error) => {
    console.log(error.name + ' ' + error.message)
})

// Example 2 (with Promise)

function watchTutorialPromise() {
    return new Promise((resolve, reject) => {
        if (userLeft) {
            reject({
                name: 'User left',
                message: ';('
            })
        } else if (userWatchingCatMeme) {
            reject({
                name: 'User Watching Cat Meme',
                message: 'WebDevSimplified < Cat'
            })
        } else {
            resolve('Thumbs up and Subscribe')
        }
    })
}

watchTutorialPromise().then((message) => { // у функции нет параметров. При resolve выводит в консоль message, а при reject'ах выводит из объекта name и message
    console.log('Success: ' + message)
}).catch((error) => {
    console.log(error.name + ' ' + error.message)
})