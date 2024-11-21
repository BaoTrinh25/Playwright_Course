import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('Auto waiting', async({page}) => {
    test.setTimeout(30000); 
    const successButton = page.locator('.bg-success')

    // await successButton.click()

    // const text = await successButton.textContent()

    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 40000})
})

test('Alternative waits', async({page}) => {
    test.setTimeout(30000); 
    const successButton = page.locator('.bg-success')

    //____await for element____
    await page.waitForSelector('.bg-success', { timeout: 20000 })

    //____wait for particlular response____
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //____wait for netword calls to be completed ('NOT RECOMMENDED)
    // await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async ({page}) => {
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()
})