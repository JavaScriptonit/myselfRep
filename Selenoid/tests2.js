const { Builder, By, Capabilities } = require('selenium-webdriver');

// Создание драйвера
const driver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .usingServer('http://localhost:4444/wd/hub')
    .build();

(async function () {
    try {
        // Проверка заголовка главной страницы
        await driver.get('http://google.com');
        const title = await driver.getTitle();
        if (title !== 'Google') {
            console.error('Error: main page title is invalid');
        } else {
            console.log('Main page title is valid');
        }

        // Проверка наличия кнопок "Поиск в Google" и "Мне повезет!"
        const searchButton = await driver.findElement(By.xpath('//input[@name="btnK"]'));
        const luckyButton = await driver.findElement(By.xpath('//input[@name="btnI"]'));
        if (!searchButton || !luckyButton) {
            console.error('Error: buttons not found');
        } else {
            console.log('Buttons found');
        }

        // Проверка поиска
        await searchButton.sendKeys('Selenoid');
        await searchButton.submit();
        const searchTitle = await driver.getTitle();
        if (searchTitle.indexOf('Selenoid') === -1) {
            console.error('Error: search did not return relevant results');
        } else {
            console.log('Search results valid');
        }

        // Переход на страницу selenoid
        await driver.get('https://aerokube.com/selenoid-ui/latest/');
        const selenoidTitle = await driver.getTitle();
        if (selenoidTitle !== 'Selenoid UI') {
            console.error('Error: selenoid page title is invalid');
        } else {
            console.log('Selenoid page title is valid');
        }

        // Проверка наличия кнопки "Create New Session"
        const createNewSessionButton = await driver.findElement(By.xpath('//button[contains(text(), "Create New Session")]'));
        if (!createNewSessionButton) {
            console.error('Error: "Create New Session" button not found');
        } else {
            console.log('"Create New Session" button found');
        }

    } finally {
        await driver.quit();
    }
})();