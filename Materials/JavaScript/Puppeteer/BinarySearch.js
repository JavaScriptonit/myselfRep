// Binary search is an efficient algorithm for finding an item from a sorted list of items.
// It works by repeatedly dividing in half the portion of the list that could contain the item,
// until you've narrowed down the possible locations to just one. We used binary search in the guessing game in the introductory tutorial.

// Двоичный (бинарный) поиск (также известен как метод деления пополам или дихотомия) —
// классический алгоритм поиска элемента в отсортированном массиве (векторе), использующий дробление массива на половины.

// Example #1
let array = [-1, 0, 3, 5, 7, 9, 12,];

let search = function(nums, target) {
    let left = 0;
    let right = nums.length -1;
    let mid;

    while (left <= right) {
        mid = Math.round((right-left)/2) + left

        if (target === nums[mid]) {
            return mid;
        } else if (target < nums[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return  - 1;
}

console.log(search(array, 12))