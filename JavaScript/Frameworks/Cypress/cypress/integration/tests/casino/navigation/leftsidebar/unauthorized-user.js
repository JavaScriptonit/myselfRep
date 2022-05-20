import {selectors} from '../../../../../fixtures/selectors';
import {sidebarTitleList, sidebarCategoriesAndProv} from '../../../../../fixtures/categories';
import {providersUrlObject} from '../../../../../fixtures/urls/leftsidebar';
import {sidebarViewport, noSidebarViewport} from '../../../../../utils/sizes';

describe('[Казино] Левый сайдбар', () => { // сайдбар появляется на Веб от ширины экрана 1440 и более

  beforeEach(() => {
    cy.authenticateUrl('/casino/lobby');
  })

  it('Левый сайдбар. Названия в сайдбаре соответствуют требованиям', () => {
    function arraysAreIdentical(params) {
      return params.arr1.every((val, index) => val === params.arr2[index])
    }

    cy.document().then((doc) => {
      let categoriesArray = (Array.from(doc.querySelectorAll(selectors.leftSidebar.categoriesNames))).map(e => e.innerText)
      cy.wrap(categoriesArray).as('categoriesArray')
    })
    cy.get('@categoriesArray').then(categoriesArray => {
      cy.log(categoriesArray, categoriesArray.length)
      expect(arraysAreIdentical({arr1: sidebarCategoriesAndProv, arr2: categoriesArray})).equal(true)
    });

    cy.document().then((doc) => {
      let sidebarArray = (Array.from(doc.querySelectorAll(selectors.leftSidebar.blockNames))).map(e => e.innerText)
      cy.wrap(sidebarArray).as('sidebarArray')
    })
    cy.get('@sidebarArray').then(sidebarArray => {
      cy.log(sidebarArray, sidebarArray.length)
      expect(arraysAreIdentical({arr1: sidebarTitleList, arr2: sidebarArray})).equal(true)
    });
  })

  sidebarViewport.forEach((device) => {
    it(`Should display sidebar on ${device}`, () => {
      if (Cypress._.isArray(device)) {
        cy.viewport(device[0], device[1]);
      } else {
        cy.viewport(device);
      }
      cy.get(selectors.leftSidebar.favouritesButton).should('be.visible');
    });
  });

  noSidebarViewport.forEach((device) => {
    it(`Should not display sidebar on ${device}`, () => {
      if (Cypress._.isArray(device)) {
        cy.viewport(device[0], device[1]);
      } else {
        cy.viewport(device);
      }
      cy.get(selectors.leftSidebar.favouritesButton).should('be.hidden');
    });
  });

  // it('Категории. Отображается количество игр напротив категорий и провайдеров', async () => {
  //   expect.assertions(1)
  //   const gameCount = await page.evaluate((selectors) => { // массив чисел (игр в категориях)
  //     const elements = document.querySelectorAll(selectors.leftSidebar.categoriesCount)
  //     const elementsArray = Array.from(elements)
  //     return elementsArray.map(element => element.innerText)
  //   }, selectors)
  //   const isGameCountGreaterThan0 = gameCount.length > 0 // проверить длину массива глобально вне evaluate
  //   const favoritesCat = Number(gameCount[1]) === 0 // проверить что для неавторизованного пользователя в Категории "Избранное" - 0 игр
  //   gameCount.splice(1, 1) // удалить из массива Избранное
  //   const isEveryGameCountGreaterThen0 = gameCount.every(e => e > 0) // проверить что во всех категориях игр больше 0 (кроме Избранное)
  //   expect(isGameCountGreaterThan0 && favoritesCat && isEveryGameCountGreaterThen0).toEqual(true)
  // })
  // it('Категории. Все ссылки категорий соответствуют требованиям, кроме категории "Избранное"', async () => {
  //   expect.assertions(1)
  //   const categoriesUrlArr = await page.evaluate((selectors) => { // массив ссылок категорий
  //     const elements = document.querySelectorAll(selectors.leftSidebar.categoriesUrls)
  //     const elementsArray = Array.from(elements)
  //     return elementsArray.map(element => element.href)
  //   }, selectors)
  //   categoriesUrlArr.splice(1, 1) // вырезать из массива categoriesUrlArr значения с 1 до 1
  //   console.log(1, categoriesUrlArr)
  //   const AreArraysIdentical = await helpers.areArraysIdentical({arr1: categoriesUrlListQa, arr2: categoriesUrlArr})
  //   expect(AreArraysIdentical).toEqual(true)
  // })
  // it('Категории. Нажать по очереди на все категории, кроме категории "Избранное"', async () => {
  //   expect.assertions(1)
  //   const linkAttributes = await page.evaluate(async (selectors) => {
  //     const elementsArray = Array.from(document.querySelectorAll(selectors.leftSidebar.categoriesUrls))
  //     elementsArray.splice(1, 1)
  //     const results = []
  //     for (let i = 0; i < elementsArray.length; i++) {
  //       results.push(elementsArray[i].getAttribute('data-element')) // console.log(i, elementsArray[i].getAttribute('data-element'))
  //     }
  //     return results
  //   }, selectors) // console.log(1, linkAttributes) // sidebar-link-2236
  //   const linkAttributes2 = linkAttributes.map(element => '[data-element="' + element + '"]') // console.log(2, linkAttributes2) // '[data-element="sidebar-link-2236"]'
  //   const urls = []
  //   for (let i = 0; i < linkAttributes2.length; i++) {
  //     await page.click(linkAttributes2[i])
  //     await page.waitForNavigation()
  //     urls.push(page.url())
  //   } // console.log(3, urls) // 'https://dev.dev.joinbet.com/casino/categories/2236'
  //   // urls.splice(1,1) // вырезать из массива urls значения с 1 до 1
  //   const AreArraysIdentical = await helpers.areArraysIdentical({arr1: categoriesUrlListQa, arr2: urls})
  //   expect(AreArraysIdentical).toEqual(true)
  // })
  // it('Провайдеры. Проверить GUI провайдеров', async () => {
  //   expect.assertions(3)
  //   const providersImgLinksArray = await page.evaluate((selectors) => {
  //     return (Array.from(document.querySelectorAll(selectors.leftSidebar.providersImages))).map(e => e.src)
  //   }, selectors)
  //   const isEveryStatus200 = await helpers.checkingLoadingOfImages({arrLinks: providersImgLinksArray})
  //   expect(isEveryStatus200).toEqual(true) // проверка всех картинок Провайдеров на 200 статус
  //   const categoriesImgViewPort = await helpers.stylePickerArray({selector: selectors.leftSidebar.categoriesImages}, ['width', 'height'])
  //   expect((categoriesImgViewPort).every(style => style.width === '16px' && style.height === '16px')).toEqual(true) // проверка всех картинок категорий на размер 16х16
  //   const categoriesImgColor = await helpers.stylePickerArray({selector: selectors.leftSidebar.categoriesImagesColor}, ['fill'])
  //   expect((categoriesImgColor).every(style => style.fill === 'rgb(181, 186, 195)')).toEqual(true) // проверка всех картинок категорий на цвет
  // })
  // it('Провайдеры. Нажать на пункты меню провайдеров', async () => {
  //   expect.assertions(1)
  //   const linkAttributes = await page.evaluate(async (selectors) => {
  //     const elementsArray = Array.from(document.querySelectorAll(selectors.leftSidebar.providersUrls))
  //     const results = []
  //     for (const el of elementsArray) {results.push(el.getAttribute('data-element'))}
  //     return results
  //   }, selectors)
  //   const linkAttributes2 = linkAttributes.map(element => '[data-element="' + element + '"]')
  //   const providersUrls = []
  //   for (const el of linkAttributes2) {
  //     await page.click(el)
  //     await page.waitForNavigation()
  //     providersUrls.push(page.url())
  //   }
  //   const AreArraysIdentical = await helpers.areArraysIdentical({arr1: providersUrlListQa, arr2: providersUrls})
  //   expect(AreArraysIdentical).toEqual(true)
  // })

  it('Провайдеры. Нажать на кнопку "Все провайдеры"', () => {
    cy.get(selectors.leftSidebar.allProvidersButton).click()
    cy.get(selectors.providers.allProviders.allProvidersHeader).should('be.visible'); // проверить отображение header "Все провайдеры"
    cy.url().should('include', providersUrlObject.all) // проверить ссылку "Все провайдеры"
  })
})
