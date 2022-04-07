// Palindrome function - проверить является ли 'string' палиндромом
// A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward or forward.

function palindrome(str) {
    let re = /[\W_]/g;
    let lowRegStr = str.toLowerCase().replace(re, ''); // 'replace' преобразует строку в слово без спец символов (либо можно заменить слово в строке)
    console.log('Строка без спец символов и без учета регистра = ', lowRegStr) // amanaplanacanalpanama
    let reverseStr = lowRegStr.split('').reverse().join(''); // 'join' преобразует массив в строку с разделителем (separator) между каждым элементом массива, например '' - пробел или ' + '
    console.log('Строка в обратном порядке = ', reverseStr) // amanaplanacanalpanama
    let result = reverseStr === lowRegStr; // проверить что 2 строки идентичны
    console.log(result)
    return result
}
// Example #1
let example1 = "A man, a plan, a canal. Panama";
console.log(1, palindrome(example1))
//
// Example #2
let example2 = "12345678987654321";
console.log(2, palindrome(example2));
//
// Example #3
let example3 = "eye";
console.log(3, palindrome(example3));
// Example #4
let example4 = "123456789876543210";
console.log(4, palindrome(example4));



