import { leftSidebar, providers } from '../../../../../fixtures/selectors';
import { sidebarTitleList, sidebarCatAndProvList } from '../../../../../fixtures/categories';
import {
    providersUrlObject,
    categoriesUrlListQa,
    providersUrlListQa,
} from '../../../../../fixtures/urls/leftsidebar';
import { sidebarViewport, noSidebarViewport } from '../../../../../utils/sizes';
import { checkingLoadingOfImages } from '../../../../../support/common';
import { greyColor } from '../../../../../fixtures/styles/common';

// сайдбар появляется на Веб от ширины экрана 1440 и более
describe('[Казино] Левый сайдбар', () => {
    beforeEach(() => {
        cy.authenticateUrl('/casino/lobby');
    });

    it('Левый сайдбар. Названия в сайдбаре соответствуют требованиям', () => {
        cy.get(leftSidebar.categoriesNames)
            .should('have.length', sidebarCatAndProvList.length)
            .each(($innerText, index) => {
                cy.get($innerText).should('have.text', sidebarCatAndProvList[index]);
            });

        cy.get(leftSidebar.blockNames)
            .should('have.length', sidebarTitleList.length)
            .each(($innerText, index) => {
                cy.get($innerText).should('have.text', sidebarTitleList[index]);
            });
    });

    sidebarViewport.forEach((device) => {
        it(`Левый сайдбар. Отображается на ${device}`, () => {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1]);
            } else {
                cy.viewport(device);
            }
            cy.get(leftSidebar.favouritesButton).should('be.visible');
        });
    });

    noSidebarViewport.forEach((device) => {
        it(`Левый сайдбар. Не отображается на ${device}`, () => {
            if (Cypress._.isArray(device)) {
                cy.viewport(device[0], device[1]);
            } else {
                cy.viewport(device);
            }
            cy.get(leftSidebar.favouritesButton).should('be.hidden');
        });
    });

    it('Категории. Отображается количество игр напротив категорий и провайдеров', () => {
        cy.get(leftSidebar.categoriesCount)
            .should('have.length', sidebarCatAndProvList.length)
            .each(($innerText, index) => {
                if (index === 1) {
                    cy.get($innerText).should('have.text', 0);
                } else {
                    cy.get($innerText).invoke('text').then(parseFloat).should('be.gt', 0);
                }
            });
    });

    it('Категории. Все ссылки категорий соответствуют требованиям, кроме категории "Избранное"', () => {
        cy.document().then((doc) => {
            let categoriesUrlArr = Array.from(doc.querySelectorAll(leftSidebar.categoriesUrls)).map(
                (e) => e.href,
            );
            categoriesUrlArr.splice(1, 1); // удалить из массива Избранное
            cy.get(categoriesUrlArr).each(($url, index) => {
                expect($url).equal(categoriesUrlListQa[index]);
            });
        });
    });

    it('Категории. Нажать по очереди на все категории, кроме категории "Избранное"', () => {
        cy.document().then((doc) => {
            let categoriesUrlArr = Array.from(doc.querySelectorAll(leftSidebar.categoriesUrls));
            categoriesUrlArr.splice(1, 1);
            const linkAttributes = [];
            for (const el of categoriesUrlArr) {
                linkAttributes.push(el.getAttribute('data-element'));
            }
            cy.get(linkAttributes).each(($ele, i) => {
                let linkUrls = '[data-element="' + $ele + '"]';
                cy.get(linkUrls).click();
                cy.url().should('include', categoriesUrlListQa[i]);
            });
        });
    });

    it('Провайдеры. Проверить GUI провайдеров', () => {
        checkingLoadingOfImages({ selector: leftSidebar.providersImages });

        cy.get(leftSidebar.categoriesImages)
            .should('have.length', 11)
            .each(($sel) => {
                cy.get($sel).should('have.attr', 'width', '16');
                cy.get($sel).should('have.attr', 'height', '16');
            }); // проверка всех картинок категорий на размер 16х16

        cy.get(leftSidebar.categoriesImagesColor)
            .should('have.length', 29)
            .each(($sel) => {
                cy.get($sel).should('have.attr', 'fill', greyColor.categoriesImages);
            }); // проверка всех картинок категорий/провайдеров на цвет
    });

    it('Провайдеры. Нажать на пункты меню провайдеров', () => {
        cy.document().then((doc) => {
            let providersUrlArr = Array.from(doc.querySelectorAll(leftSidebar.providersUrls));
            const linkAttributes = [];
            for (const el of providersUrlArr) {
                linkAttributes.push(el.getAttribute('data-element'));
            }
            cy.get(linkAttributes).each(($ele, i) => {
                let linkUrls = '[data-element="' + $ele + '"]';
                cy.get(linkUrls).click();
                cy.url().should('include', providersUrlListQa[i]); // сравнить url каждого открытого провайдера с массивом ссылок
            });
        });
    });

    it('Провайдеры. Нажать на кнопку "Все провайдеры"', () => {
        cy.get(leftSidebar.allProvidersButton).click();
        cy.xpath(providers.allProviders.allProvidersHeaderXpath).should('be.visible'); // проверить отображение header "Все провайдеры"
        cy.url().should('include', providersUrlObject.all); // проверить ссылку "Все провайдеры"
    });
});
