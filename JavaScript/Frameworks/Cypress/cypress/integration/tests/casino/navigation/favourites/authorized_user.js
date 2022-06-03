import {
    profileMenu,
    header,
    leftSidebar,
    categories,
    reg,
    auth,
    gamesCards,
    singleGame,
} from '../../../../../fixtures/selectors';
import { starOffCheck, favouritesNumberCheck } from '../../../../../support/common';
import { links } from '../../../../../support/utils/common';
import { categoriesUrlObject } from '../../../../../fixtures/urls/leftsidebar';
const { authByEmail } = require('../../../../../support/utils/auth');

describe('Казино', () => {
    beforeEach(() => {
        cy.authenticateUrl('/casino/lobby');
        authByEmail('shabunovaa@yandex.ru', '123123123Aa');
    });

    afterEach(() => {
        // cy.get(header.profileButton).click();
        // cy.get(profileMenu.profileExit).click();
    });

    describe('Категория "Избранное". Авторизованный пользователь', () => {
        // сайдбар появляется на Веб от ширины экрана 1440 и более

        // async function favouriteGameNameCheck(params) { // 1. переход в избранное, 2. находим игру в избранном и проверяем название
        //   await helpers.clickWaitSelectors({clickSelector: selectors.leftSidebar.favouritesButton, waitSelector: params.sel}) // перейти в избранное и проверяем что есть игра
        //   const favouriteGameCardsTextArray = await page.evaluate((selectors) => {
        //     return (Array.from(document.querySelectorAll(selectors.categories.gameCardText))).map(e => e.innerText)
        //   }, selectors)
        //   expect(favouriteGameCardsTextArray.includes(params.text)).toEqual(params.boolean) // проверить что в избранном есть игра с названием добавленной игры
        // }

        // async function asteriskChangeOnGamePageCheck(params) { // 1. проверить сколько игр, 2. перейти на страницу игры, 3. проверить звезду, 4. кликнуть на звезду, 5. проверить звезду, 6. перейти в избранное, 7. проверить кол-во игр и текст игры
        //   expect(await core.favouritesNumberCheck({count: params.countOne})).toEqual(true) // проверить сколько игр в Категории "Избранное"
        //   const favouriteGameCardText = await page.$eval(selectors.categories.gameCardText, el => el.innerText) // сохранить текст карточки игры
        //   await helpers.findPositionAndClick({selector: selectors.categories.gameCard}) // кликаем на карточку игры
        //   await helpers.clickWaitSelectors({clickSelector: selectors.gamesCards.gameButton, waitSelector: selectors.singleGame.asteriskFavorites}) // переходим на страницу игры на деньги
        //   await asteriskStyleCheck({style: params.firstStyle})
        //   await helpers.clickWaitSelectors({clickSelector: selectors.singleGame.asteriskFavorites, waitSelector: selectors.singleGame.asteriskFavorites}) // кликнуть на звёздочку
        //   await asteriskStyleCheck({style: params.secondStyle})
        //   await helpers.clickWaitSelectors({clickSelector: selectors.navMenu.links.casino, waitSelector: selectors.categories.allGames.starFirstGame}) // перейти в лобби
        //   expect(await core.favouritesNumberCheck({count: params.countTwo})).toEqual(true) // проверить сколько игр в Категории "Избранное"
        //   await favouriteGameNameCheck({text: favouriteGameCardText, sel: params.sel, boolean: params.value})
        // }

        it('Добавить игру в список "Избранное"', () => {
            cy.get(leftSidebar.allGamesButton).click({ waitForAnimations: true });
            starOffCheck({ sel: categories.allGames.starFirstGame }); // проверяем стили всех звёздочек
            favouritesNumberCheck({ count: 0 });
            cy.get(categories.allGames.starFirstGame).first().click();
            favouritesNumberCheck({ count: 1 });
            cy.get('[aria-checked="true"]').should('be.visible');
            cy.get(categories.allGames.starFirstGame)
                .first()
                .should('have.css', 'background-image', links.starOn);
            cy.get(categories.gameCardText)
                .first()
                .then(($el) => {
                    const txt = $el.text();
                    cy.get(leftSidebar.favouritesButton).click();
                    cy.get(categories.gameCardText).should('have.text', txt);
                });
            cy.get(categories.allGames.starFirstGame).click();
        });

        it('Проверить игры в "Избранное"', () => {
            cy.get(leftSidebar.favouritesButton).click();
            cy.url().should('include', categoriesUrlObject.favourites);

            cy.get(leftSidebar.categoriesCount)
                .eq(1)
                .then(($el) => {
                    let favouritesCount = $el.text();
                    if (favouritesCount.includes('0')) {
                        cy.get(categories.favourite.header).should('be.visible');
                    } // проверить что на странице Избранного отображается header "Избранное"
                    else {
                        cy.get('[aria-checked="true"]')
                            .should('be.visible')
                            .and('have.length', favouritesCount);
                        cy.get(categories.allGames.starFirstGame).click({ multiple: true }).should('not.exist');
                    } // проверить что на странице Избранного отображается карточка игры
                });
        });

        it('Удалить игру из списка "Избранное"', () => {
            cy.get(leftSidebar.allGamesButton).click({ waitForAnimations: true });
            starOffCheck({ sel: categories.allGames.starFirstGame }); // проверяем стили всех звёздочек
            favouritesNumberCheck({ count: 0 });
            cy.get(categories.allGames.starFirstGame).first().click();
            favouritesNumberCheck({ count: 1 });
            cy.get(categories.allGames.starFirstGame).first().click();
            favouritesNumberCheck({ count: 0 });
            starOffCheck({ sel: categories.allGames.starFirstGame });
            cy.get('[aria-checked="true"]').should('not.exist');
            cy.get(leftSidebar.favouritesButton).click();
            cy.get('[aria-checked="true"]').should('not.exist');
            cy.get(categories.gameCardText).should('not.exist');

            // Для проверок с несколькими играми в Избранном
            // cy.get(categories.gameCardText).first()
            //   .then(($el) => {
            //     const txt = $el.text();
            //     cy.get(leftSidebar.favouritesButton).click();
            //     cy.get(categories.gameCardText)
            //       .each(($el) => {
            //         cy.get($el).should('not.have.text', txt)
            //       });
            //   });
        });

        it('Нажать на категорию "Избранное"', () => {
            cy.get(leftSidebar.favouritesButton).click();
            cy.url().should('include', categoriesUrlObject.favourites);
            cy.get(categories.favourite.header).should('be.visible');
        });

        it.skip('Проверить страницу "Избранное", если не добавлено ни одной игры', () => {
            // expect.assertions(5)
            // await helpers.clickWaitSelectors({clickSelector: selectors.leftSidebar.favouritesButton, waitSelector: selectors.categories.favourite.header}) // дождаться пока появится header "Избранное"
            // expect(await page.$eval(selectors.categories.favourite.header, el => el.innerText)).toEqual('В избранном пока ничего нет')
            // expect(await page.$eval(selectors.categories.favourite.goButton, el => el.innerText)).toEqual('Перейти к играм')
            // const helpText = await page.$eval(selectors.categories.favourite.helpText, el => el.innerText)
            // expect(helpText.includes('Добавляйте любимые игры в избранное с помощью ★')).toEqual(true) // "*" не удаётся проверить на ===, из-за этого 2 проверки на .length и .includes
            // expect(helpText.length).toEqual(48) // проверить кол-во символов в строке "Добавляйте любимые игры в избранное с помощью ★︎"
            // expect(page.url()).toEqual(categoriesUrlObject.favourites) // проверить URL страницы "Избранное"
        });

        it.only('Нажать на кнопку "Перейти к играм" без игр в избранном', () => {
            cy.get(leftSidebar.favouritesButton).click();
            cy.url().should('include', categoriesUrlObject.favourites);
            cy.get(categories.favourite.header).should('be.visible');
            cy.get(categories.favourite.goButton).click();
            cy.url().should('include', categoriesUrlObject.allGames);
            cy.get(categories.allGames.starFirstGame).should('be.visible');
        });

        it.skip('Добавить игру в "Избранное" через страницу открытой игры', () => {
            // expect.assertions(5)
            // await asteriskChangeOnGamePageCheck({
            //   countOne: 0,
            //   firstStyle: data.styles.offAsteriskFavorites,
            //   secondStyle: data.styles.onAsteriskFavorites,
            //   countTwo: 1,
            //   sel: selectors.categories.allGames.starFirstGame,
            //   value: true
            // })
        });

        it.skip('Удалить игру из "Избранного" через страницу открытой игры', () => {
            //   expect.assertions(5)
            //   await helpers.clickWaitSelectors({clickSelector: selectors.leftSidebar.favouritesButton, waitSelector: selectors.categories.allGames.starFirstGame}) // перейти в избранное и проверяем что есть игра
            //   await asteriskChangeOnGamePageCheck({
            //     countOne: 1,
            //     firstStyle: data.styles.onAsteriskFavorites,
            //     secondStyle: data.styles.offAsteriskFavorites,
            //     countTwo: 0,
            //     sel: selectors.categories.favourite.header,
            //     value: false
            //   })
        });

        it.skip('Проверить группировку игр по провайдерам', () => {});

        it.skip('Проверить отображение витрины от провайдера', () => {});

        it.skip('Удалить игру из "Избранного" через карточку игры (на странице избранного)', () => {
            //@todo Дописать в тест-кейс добавление игры в избранное перед удалением
            // expect.assertions(4)
            // await helpers.clickWaitSelectors({clickSelector: selectors.leftSidebar.favouritesButton, waitSelector: selectors.categories.allGames.starFirstGame}) // перейти в избранное и проверяем что есть игра
            // expect(await core.favouritesNumberCheck({count: 1})).toEqual(true) // проверить сколько игр в Категории "Избранное"
            // const favouriteGameCardText = await page.$eval(selectors.categories.gameCardText, el => el.innerText) // сохранить текст карточки игры
            // await asteriskStyleCheck({style: data.styles.onAsteriskFavorites})
            // await helpers.clickWaitSelectors({clickSelector: selectors.categories.allGames.starFirstGame, waitSelector: selectors.categories.favourite.header}) // кликнуть на звёздочку
            // expect(await core.favouritesNumberCheck({count: 0})).toEqual(true) // проверить сколько игр в Категории "Избранное"
            // await favouriteGameNameCheck({text: favouriteGameCardText, sel: selectors.categories.favourite.header, boolean: false}) // проверить что в избранном нет игры с таким названием
        });

        it.skip('Проверить, что в избранное нельзя добавить больше 30 игр', () => {});

        it.skip('Проверить обновление игр в избранном при открытии сайта в 2 вкладках', () => {});

        it.skip('Проверить наполнение страницы избранного 1440 px', () => {});

        it.skip('Проверить наполнение страницы избранного 1280 px', () => {});
        //@todo Дописать 3 авто-теста в /game-page/authorized и /game-page/unauthorized на добавление/удаление из избранного
    });
});
