// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

// Example 1:

const age = 26;
const beverage = age >= 21 ? "Beer" : "Juice";
console.log(beverage); // "Beer"

// Example 2:

width === 1440 // если ширина экрана === 1440
    ? cy.get(rightSidebar.mainBlock).should('be.visible') // должен отображаться Левый сайдбар
    : cy.get(rightSidebar.mainBlock).should('be.hidden'); // если нет - левый сайдбар не должен отображаться

// Example 3:

function example() {
    return condition1 ? value1
        : condition2 ? value2
            : condition3 ? value3
                : value4;
}

// Пример через объект без условий:

const str = 'Make me painful';

const solution = (sentence) => {
    const smiles = {
        'Make me smile': 'Make me :D',
        'Make me grin': 'Make me :)',
        'Make me sad': 'Make me :(',
        'Make me shocked': 'Make me D:',
        'Make me bored': 'Make me (-_-)',
        'Make me painful': 'Make me (>_<)',
    };
    return smiles[sentence];
};

console.log(solution(str));
