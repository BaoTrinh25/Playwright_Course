import { expect, test } from '@playwright/test';

/* page.goto('http://localhost:4200/') trả về một promise, 
để xử lý chính xác kết quả từ promise, cần sử dụng await. 
*/
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test('Locator syntax rules', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
    page.locator('#inputEmail1')

    //by Clas value
    page.locator(".shape-rectangle ")

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Clas values full
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by Xpath (not recommended)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()
    
    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click()

    await page.getByTitle('IoT Dashboard').click()
   
})

test('Locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
        .getByRole('textbox', {name: "Email"}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()

})

test('Reusing the locator', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
    
})

test ('Extracting values', async({page}) => {
    //Single Test Value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})  //Tìm phần tử cha có chứa văn bản "Basic form"
    const buttonText = await basicForm.locator('button').textContent() //Lấy văn bản của button bên trong phần tử nb-card vừa tìm được
    expect(buttonText).toEqual('Submit') // so sánh với giá trị mong đợi phải là "Submit"

    //All Test Values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents() //tìm tất cả các phần tử 'nb-radio' và lấy tất cả văn bản chứa trong các phần tử
    expect(allRadioButtonsLabels).toContain("Option 1") //với mong đợi lấy ra được giá trị có chứa "Option 1"

    //Input Value
    const emailField = basicForm.getByRole('textbox', {name: "Email"}) //tìm trường textbox bên trong Basic form với thuộc tính name là Email
    await emailField.fill('test@test.com') //Điền giá trị vào textbox
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com') //so sánh và đảm bảo với giá trị mong đợi là test@test.com

    const placeholderValue = await emailField.getAttribute('placeholder') //tìm thuộc tính placeholder của trường nhập liệu "Email"
    expect(placeholderValue).toEqual('Email') //giá trị mong đợi phải là Email
})

test('Assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card') //Xác định vị trí nút trong phần tử nb-card với tiêu đề "Basic Form".
        .filter({hasText: "Basic Form"})
        .locator('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit") // Đảm bảo rằng nội dung văn bản của nút là "Submit"

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit') //kiểm tra xem nút được định vị (basicFormButton) có văn bản "Submit" hay không

    //Soft Assertion
    await expect.soft(basicFormButton).toHaveText('Submit') //Soft assertion không ngắt quá trình kiểm tra ngay cả khi nó thất bại.
    await basicFormButton.click()
})