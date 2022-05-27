import {
    leftSidebar,
    categories,
    reg,
    auth,
    gamesCards,
    singleGame,
} from '../../../../../fixtures/selectors';
import { elementsStyleCheck, favouritesNumberCheck } from '../../../../../support/common/index';
import { black } from '../../../../../fixtures/styles/common';

// сайдбар появляется на Веб от ширины экрана 1440 и более
describe('[Казино] Левый сайдбар', () => {
    beforeEach(() => {
        cy.authenticateUrl('/casino/lobby');
    });

    it('Проверить категорию "Избранное"', async () => {
        favouritesNumberCheck({ count: 0 });
    });

    it('Нажать на категорию "Избранное"', () => {
        cy.get(leftSidebar.favouritesButton).click();
        cy.get(auth.window1.signInPhoneInput).should('be.visible');
    });

    it('Нажать на звёздочку на карточке игры', () => {
        elementsStyleCheck({
            selector: categories.allGames.starFirstGame,
            color: black.color,
        }); // проверяем стиль всех звёздочек
        cy.get(categories.allGames.starFirstGame).first().click(); // кликнуть на 1ую звёздочку в витрине игр
        cy.get(reg.window1.closeWindow).should('be.visible').click(); // дождаться пока появится модальное окно Авторизации
        elementsStyleCheck({
            selector: categories.allGames.starFirstGame,
            color: black.color,
        }); // проверяем стиль всех звёздочек
        favouritesNumberCheck({ count: 0 });
    });

    it('Нажать на звёздочку на странице открытой игры', () => {
        cy.get(gamesCards.gameOrDemoButton).contains('Демо').first().click({ force: true });
        cy.get(singleGame.closeButton).should('be.visible'); // дождаться пока появится
        elementsStyleCheck({ selector: singleGame.asteriskFavorites, color: black.color }); // проверяем стиль звёздочки на странице игры
        cy.get(categories.allGames.starFirstGame).first().click();
        cy.get(reg.window1.closeWindow).should('be.visible').click(); // дождаться пока появится модальное окно Авторизации
        elementsStyleCheck({ selector: singleGame.asteriskFavorites, color: black.color }); // проверяем стиль звёздочки на странице игры
    });
});
