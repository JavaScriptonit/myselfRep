import { leftSidebar } from '../../fixtures/selectors';
const stand = Cypress.env('stand');
const images = Cypress.env('images');

// Функция сравнения двух массивов
function arraysAreIdentical(params) {
    return params.arr1.every((val, index) => val === params.arr2[index]);
}

// Функция проверки статусов картинок по селектору
function checkingLoadingOfImages(params) {
    cy.get(params.selector).each(($sel) => {
        cy.get($sel)
            .should('have.attr', 'src')
            .then(($url) => {
                cy.request({
                    url: $url,
                    auth: { username: stand.username, password: stand.password },
                    body: { username: images.username, password: images.password },
                }).should((response) => {
                    expect(response.status).to.eq(200);
                });
            });
    });
}

//@todo Рефакторинг функции stylePickerArray под cypress
// Функция возвращающая массив стилей по селектору и ключу
function stylePickerArray(params, keys) {
    cy.document().then((doc) => {
        let returnStyles = [];
        Array.from(doc.querySelectorAll(params.selector)).map((im) => {
            const computedStyles = window.getComputedStyle(im);
            const neededStyles = {};
            keys.forEach((style) => {
                neededStyles[style] = computedStyles[style];
            });
            returnStyles.push(neededStyles);
        });
        return cy.wrap(returnStyles).as('returnStyles');
    });
}

// Функция проверки кол-ва игр в Категории "Избранное"
function favouritesNumberCheck(params) {
    cy.get(leftSidebar.categoriesCount).eq(1).should('have.text', params.count);
}

// Функция проверки стилей элементов
function elementsStyleCheck(params) {
    stylePickerArray({ selector: params.selector }, ['fill']);
    cy.get('@returnStyles').then((returnStyles) => {
        expect(returnStyles.length > 0).to.eq(true);
    });
    cy.get('@returnStyles').each((style) => {
        expect(style.fill).to.eq(params.color);
    });
}

module.exports = {
    elementsStyleCheck,
    favouritesNumberCheck,
    stylePickerArray,
    checkingLoadingOfImages,
    arraysAreIdentical,
};
