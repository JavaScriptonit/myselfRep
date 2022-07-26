// ДЗ для casino-chempion.co:

const puppeteer = require('puppeteer');
const axios = require("axios");
jest.setTimeout(20000);

describe('Казино', () => {
    let browser
    let page
    beforeEach(async () => {
        browser = await puppeteer.launch({headless: false, defaultViewport: null, devtools: true, args: [
                '--window-size=1920,1170',
                '--window-position=0,0',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process'
            ]});
        page = await browser.newPage();
        await page.goto('https://casino-chempion.co/');
    })
    afterEach(async () => {
        // await browser.close();
    })
    describe('Главная', () => {
        const checkingLoadingOfImages = async (params) => {
            const statuses = [];
            for (const link of params.arrLinks) {
                const status = (await axios.get(link)).status === 200;
                const requestStatus = (await axios.get(link)).status;
                console.log('Request status = ', requestStatus);
                statuses.push(status);
            }
            console.log('Статусы всех ссылок в массиве === 200:', statuses);
            return statuses.every(status => status) && statuses.length > 0
        }

        const selectors = {
            main: {
                games: {
                    img: '[class="game-item game-item--no-logged"] > img', // картинки игр провайдеров
                    cards: '[class="game-item__overlay"]', // карточки игр
                    demoButton: '[class="game-item__overlay"] > button:nth-child(3)', // кнопка "Демо"
                    playButton: '[class="game-item__overlay"] > button:nth-child(2)', // кнопка "Играть"
                    top: {
                        pyramidStrike: '[data-test="game-item game-item--pyramid_strike"] [class="game-item__overlay"]',
                    }
                },
                gamePage: {
                    iFrame: '[class="game-frame"] > iframe',
                }
            }
        }

        it('Витрина игр. Проверить загрузку всех картинок игр', async () => {
            expect.assertions(1)
            const providersImgLinksArray = await page.evaluate((selectors) => {
                return (Array.from(document.querySelectorAll(selectors.main.games.img))).map(e => e.src);
            }, selectors);
            console.log('Массив ссылок картинок всех игр из витрины на Главной:', providersImgLinksArray);
            const isEveryStatus200 = await checkingLoadingOfImages({arrLinks: providersImgLinksArray});
            // Проверка всех картинок Провайдеров на 200 статус
            expect(isEveryStatus200).toEqual(true);
        })

        it('В игре с демо-режимом нажать на кнопку "ДЕМО"', async () => {
            expect.assertions(1)
            await page.waitForSelector(selectors.main.games.demoButton, {hidden: true});
            await page.hover(selectors.main.games.top.pyramidStrike);
            // Проверка ховера по карточке игры, появление кнопки "Демо"
            await page.waitForSelector(selectors.main.games.demoButton, {visible: true});
            await page.click(selectors.main.games.demoButton);
            await page.waitForNavigation();
            await page.waitFor(3500);
            const elementHandle = await page.waitForSelector(selectors.main.gamePage.iFrame);
            const frameSingleGame = await elementHandle.contentFrame();
            const urlFromFrameCheck = frameSingleGame.url();
            console.log('url iFrame: ', urlFromFrameCheck);
            // Проверка URL
            expect(urlFromFrameCheck.length).toBeGreaterThan(0);
            const status = await checkingLoadingOfImages({arrLinks: [urlFromFrameCheck]})
            // Проверка статуса запроса === 200
            expect(status).toEqual(true)
        })
    })
})

/*
Резюме по пройденным прогонам и написанным авто-тестам:
1) Используется следующий стек:
язык JavaScript + фреймворк Puppeteer + пакет axios для отправки запросов
2) 2 авто-теста, которые покрывают следующий функционал:
1ый тест 'Витрина игр. Проверить загрузку всех картинок игр' собирает 98 ссылок картинок игр с главной страницы (витрины)
и проверяет отправку запроса по каждой ссылке этих картинок на статус 200.
Если хоть 1 картинка не отображается - тест упадёт и легко определить на какой из игр.

2ой тест 'В игре с демо-режимом нажать на кнопку "ДЕМО"' проверяет по заданной карточке игры ховер,
переход по ссылке и загрузку iFrame. Из iFrame получаем ссылку игры и аналогичным образом проверяем отправку запроса по этой ссылке.
Этот авто-тест проверяю на 2ух играх и прикладываю позитивный и негативный прогон.
В 1ом случае игра загружается и запрос возвращает 200 статус, в другом случае - 500 ответ и тест падает
 */