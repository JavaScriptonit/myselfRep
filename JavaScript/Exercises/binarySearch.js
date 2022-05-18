// Binary search is an efficient algorithm for finding an item from a sorted list of items.
// It works by repeatedly dividing in half the portion of the list that could contain the item,
// until you've narrowed down the possible locations to just one. We used binary search in the guessing game in the introductory tutorial.

// Двоичный (бинарный) поиск (также известен как метод деления пополам или дихотомия) —
// классический алгоритм поиска элемента в отсортированном массиве (векторе), использующий дробление массива на половины.

// Example #1
let array = [-1, 0, 3, 5, 7, 9, 12,];

let search = function(nums, target) { // Функция, которая в качестве аргумента получает отсортированный массив с числами и target, который мы ищем
    let left = 0; // левая граница
    let right = nums.length -1; // правая граница
    let mid; // середина массива

    while (left <= right) { // итерироваться до тех пор пока левая граница меньше или равна правой
        mid = Math.round((right-left)/2) + left // Math.round() - так как индексы целочисленные. Вычисляем длину текущего подмассива. Расчет позиции центрального элемента

        if (target === nums[mid]) { // если число равно числу, которое лежит в nums в центральной позиции
            return mid; // возвращаем позицию искомого элемента (нашли это число)
        } else if (target < nums[mid]) { // если число меньше чем середина то всю правую часть можно откинуть
            right = mid - 1; // поменяли позицию правого указателя
        } else { // число больше чем nums[mid] - меняем позицию левого указателя
            left = mid + 1;
        }
    }
    return  - 1; // возвращаем "-1" если искомого элемента в массиве не оказалось
}

console.log(search(array, 12)) // 6