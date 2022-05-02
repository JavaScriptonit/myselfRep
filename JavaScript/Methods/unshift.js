// method adds one or more elements to the beginning of an array

// Example #1
// const CountriesArray = await page.evaluate((selectors) => {
//     const country = document.querySelectorAll(selectors.registrationWindow.countryNameList) // '.lliPHg'
//     const firstCountryFromList = document.querySelector('.gkxekH').innerText // '.gkxekH' // Россия в списке стран (1ая страна)
//     const countriesArray = Array.from(country)
//     const countriesArrayText = countriesArray.map(e => e.innerText)
//     countriesArrayText.unshift(firstCountryFromList) // unshift() method is used to add one or more elements to the beginning of the given array.
//     return countriesArrayText
// }, selectors)

// Example #2
const array1 = [1, 2, 3];

console.log(2, array1.unshift(4, 5)); // expected output: 5 (the new length of the array)

console.log('2.1', array1); // expected output: Array [4, 5, 1, 2, 3]