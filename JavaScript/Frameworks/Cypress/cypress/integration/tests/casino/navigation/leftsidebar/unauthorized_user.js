import { leftSidebar, providers } from '../../../../../fixtures/selectors';
import { sidebarTitleList, sidebarCatAndProvList } from '../../../../../fixtures/categories';
import {
  providersUrlObject,
  categoriesUrlListQa,
  providersUrlListQa,
} from '../../../../../fixtures/urls/leftsidebar';
import { sidebarViewport, noSidebarViewport } from '../../../../../utils/sizes';
import {
  stylePickerArray,
  arraysAreIdentical,
  checkingLoadingOfImages,
  elementsStyleCheck,
} from '../../../../../support/common/index';
import { greyColor } from '../../../../../fixtures/styles/common';

// сайдбар появляется на Веб от ширины экрана 1440 и более
describe('[Казино] Левый сайдбар', () => {
  beforeEach(() => {
    cy.authenticateUrl('/casino/lobby');
  });

  it('Левый сайдбар. Названия в сайдбаре соответствуют требованиям', () => {
    cy.document().then((doc) => {
      let catAndProvTitlesArray = Array.from(doc.querySelectorAll(leftSidebar.categoriesNames)).map(
          (e) => e.innerText,
      );
      expect(
          arraysAreIdentical({ arr1: sidebarCatAndProvList, arr2: catAndProvTitlesArray }),
      ).equal(true);
    });

    cy.document().then((doc) => {
      let sidebarTitlesArray = Array.from(doc.querySelectorAll(leftSidebar.blockNames)).map(
          (e) => e.innerText,
      );
      expect(arraysAreIdentical({ arr1: sidebarTitleList, arr2: sidebarTitlesArray })).equal(true);
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
    cy.document().then((doc) => {
      let gameCountArray = Array.from(doc.querySelectorAll(leftSidebar.categoriesCount)).map(
          (e) => e.innerText,
      );
      expect(gameCountArray.length > 0).to.eq(true); // проверить длину массива
      expect(Number(gameCountArray[1]) === 0).to.eq(true); // проверить что для неавторизованного пользователя в Категории "Избранное" - 0 игр
      gameCountArray.splice(1, 1); // удалить из массива Избранное
      expect(gameCountArray.every((e) => e > 0)).to.eq(true); // проверить что во всех категориях игр больше 0 (кроме Избранное)
    });
  });

  it.only('Категории. Все ссылки категорий соответствуют требованиям, кроме категории "Избранное"', () => {
    cy.document().then((doc) => {
      let categoriesUrlArr = Array.from(doc.querySelectorAll(leftSidebar.categoriesUrls)).map((e) => e.href);
      categoriesUrlArr.splice(1, 1); // удалить из массива Избранное
      cy.get(categoriesUrlArr).each(($sel, index) => {
        expect($sel).equal(categoriesUrlListQa[index])
      });
    });
  });

  it('Категории. Нажать по очереди на все категории, кроме категории "Избранное"', () => {
    cy.document().then((doc) => {
      let categoriesUrlArr = Array.from(doc.querySelectorAll(leftSidebar.categoriesUrls)); // массив селекторов
      categoriesUrlArr.splice(1, 1); // удалить из массива Избранное
      const linkAttributes = []; // массив из 'sidebar-link-2236'
      for (const el of categoriesUrlArr) {
        linkAttributes.push(el.getAttribute('data-element'));
      }
      const linkAttributes2 = linkAttributes.map((element) => '[data-element="' + element + '"]');
      for (let i = 0; i < linkAttributes2.length; i++) {
        cy.get(linkAttributes2[i]).click();
        cy.url().should('include', categoriesUrlListQa[i]); // сравнить url каждой открытой категории с массивом ссылок
      }
    });
  });

  it('Провайдеры. Проверить GUI провайдеров', () => {
    checkingLoadingOfImages({ selector: leftSidebar.providersImages });

    cy.get(leftSidebar.categoriesImages).should('have.length', 11)
        .each(($sel) => {
          cy.get($sel).should('have.attr', 'width', '16')
          cy.get($sel).should('have.attr', 'height', '16')
        }); // проверка всех картинок категорий на размер 16х16

    cy.get(leftSidebar.categoriesImagesColor).should('have.length', 29)
        .each(($sel) => {
          cy.get($sel).should('have.attr', 'fill', greyColor.categoriesImages)
        }); // проверка всех картинок категорий/провайдеров на цвет
  });

  it('Провайдеры. Нажать на пункты меню провайдеров', () => {
    // cy.get(leftSidebar.providersUrls)
    //   .should('have.length', providersUrlListQa.length)
    //   .each(($sel, i) => {
    //     cy.get($sel).should('have.attr', 'data-element')
    //       .then(($link) => {
    //         let linkAttributes = '[data-element="' + $link + '"]'
    //         cy.get(linkAttributes).click();
    //         cy.url().should('include', providersUrlListQa[i]); // сравнить url каждого открытого провайдера с массивом ссылок
    //       });
    //   });

    cy.document().then((doc) => {
      let providersUrlArr = Array.from(doc.querySelectorAll(leftSidebar.providersUrls)); // массив селекторов
      const linkAttributes = []; // массив из 'sidebar-link-2236'
      for (const el of providersUrlArr) {
        linkAttributes.push(el.getAttribute('data-element'));
      }
      const linkAttributes2 = linkAttributes.map((element) => '[data-element="' + element + '"]');
      for (let i = 0; i < linkAttributes2.length; i++) {
        cy.get(linkAttributes2[i]).click();
        cy.url().should('include', providersUrlListQa[i]); // сравнить url каждого открытого провайдера с массивом ссылок
      }
    });
  });

  it('Провайдеры. Нажать на кнопку "Все провайдеры"', () => {
    cy.get(leftSidebar.allProvidersButton).click();
    cy.xpath(providers.allProviders.allProvidersHeaderXpath).should('be.visible'); // проверить отображение header "Все провайдеры"
    cy.url().should('include', providersUrlObject.all); // проверить ссылку "Все провайдеры"
  });
});
