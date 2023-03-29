// Загрузим WebDriver, с помощью которого будем управлять Selenoid
const { Builder, By, Key, until } = require('selenium-webdriver');

let driver;

// Тест #1: Проверим, что Selenoid запущен и доступен по порту 4444
async function testSelenoidRunning() {
    driver = await new Builder().forBrowser('chrome').usingServer('http://localhost:4444/wd/hub').build();
    await driver.get('http://localhost:4444/status');
    const statusText = await driver.findElement(By.css('pre')).getText();
    if (statusText.indexOf('browser') !== -1) {
        console.log('Selenoid запущен');
    } else {
        console.error('Selenoid не запущен');
    }
}

// Тест #2: Проверим, что Selenoid UI доступен по порту 8090
async function testSelenoidUI() {
    await driver.get('http://localhost:8090/#/');
    const pageTitle = await driver.getTitle();
    if (pageTitle === 'Selenoid UI') {
        console.log('Selenoid UI доступен');
    } else {
        console.error('Selenoid UI не доступен');
    }
}

// Тест #3: Проверим, что доступны драйверы для Chrome и Firefox
async function testBrowsersAvailable() {
    await driver.get('http://localhost:4444/status');
    const statusText = await driver.findElement(By.css('pre')).getText();
    if (statusText.indexOf('"firefox":') !== -1 && statusText.indexOf('"chrome":') !== -1) {
        console.log('Драйверы для Chrome и Firefox доступны');
    } else {
        console.error('Драйверы для Chrome и Firefox не доступны');
    }
}

// Тест #4: Проверим, что можно запустить простой тест на Chrome
async function testSimpleChrome() {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenoid test', Key.RETURN);
    await driver.wait(until.titleContains('Selenoid test'), 1000);
    const pageTitle = await driver.getTitle();
    if (pageTitle === 'Selenoid test - Поиск в Google') {
        console.log('Простой тест на Chrome выполнен успешно');
    } else {
        console.error('Ошибка выполнения простого теста на Chrome');
    }
}

// Тест #5: Проверим, что можно запустить простой тест на Firefox
async function testSimpleFirefox() {
    const firefoxOptions = {
        browserName: 'firefox',
        'moz:firefoxOptions': {
            args: ['-headless'],
        },
    };
    driver = await new Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(firefoxOptions).build();
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenoid test', Key.RETURN);
    await driver.wait(until.titleContains('Selenoid test'), 1000);
    const pageTitle = await driver.getTitle();
    if (pageTitle === 'Selenoid test - Поиск в Google') {
        console.log('Простой тест на Firefox выполнен успешно');
    } else {
        console.error('Ошибка выполнения простого теста на Firefox');
    }
}

// Запустим все тесты по очереди
testSelenoidRunning().then(() => {
    testSelenoidUI().then(() => {
        testBrowsersAvailable().then(() => {
            testSimpleChrome().then(() => {
                testSimpleFirefox().then(() => driver.quit());
            });
        });
    });
});
