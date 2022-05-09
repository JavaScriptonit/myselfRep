// Click по селектору:
await page.evaluate(() => {
    document.querySelector('[data-element="regButton"]').click()
})

// или shortcut:
await page.click('[data-element="regButton"]'); // page.click(selector[, options])
// selector <string> A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.

// options <Object>
// button <"left"|"right"|"middle"> Defaults to left.
// clickCount <number> defaults to 1. See UIEvent.detail.
// delay <number> Time to wait between mousedown and mouseup in milliseconds. Defaults to 0.