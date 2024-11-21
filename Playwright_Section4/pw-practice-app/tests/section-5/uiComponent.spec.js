import {test, expect} from '@playwright/test'

//beforeEach : đảm bảo các bài test đều phải bắt đầu từ việc truy cập trang chủ localhost
test.beforeEach(async ({page}) => {
    await page.goto('http:/localhost:4200/')
})

//descibe dùng để nhóm các bài test liên quan đến phần Form Layouts
test.describe('Form Layouts page', () => {
    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    //_____ 33. Input Field _____
    test('Input fields', async({page}) => {
        test.setTimeout(20000); // 20 giây
        const inputEmail = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        
        await inputEmail.fill('test@test.com')
        await inputEmail.clear()

        //pressSequentially: Gõ từng ký tự vào ô, với độ trễ giữa mỗi ký tự là 500ms.
        await inputEmail.pressSequentially('test2@test.com', {delay: 500})

        //lấy giá trị đầu vào và so sánh với giá trị mong đợi
        const inputValue = await inputEmail.inputValue()
        expect (inputValue).toEqual('test2@test.com')

        // Kiểm tra giá trị nhập vào có khớp với giá trị mong đợi?
        await expect (inputEmail).toHaveValue('test2@test.com')
    })

    //______ 34. Radio Button______
    test('Radio button', async({page}) => {
        test.setTimeout(20000); // 20 giây
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

        /*
            "check" dùng để chọn 1 radio hoặc 1 checkbox, kiểm tra trạng thái và luôn luôn chọn, 
            tránh bỏ chọn nếu có chọn trước đó (nếu sử dụng "click")
            force: true đảm bảo thao tác sẽ diễn ra ngay cả khi radio button bị ẩn hoặc bị vô hiệu hóa.
        */

        // await usingTheGridForm.getByLabel('Option 1').check({force: true})
       // Chọn Option 1
    await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})
    const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
    expect(radioStatus).toBeTruthy()  // Kiểm tra nếu Option 1 được chọn

    await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

    // Chọn Option 2
    await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})

    // Kiểm tra trạng thái của Option 1 và Option 2
    const option1Checked = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
    const option2Checked = await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()

    // Kiểm tra trạng thái của Option 1 và Option 2
    expect(option1Checked).toBeFalsy()  // Kiểm tra Option 1 không được chọn
    expect(option2Checked).toBeTruthy() // Kiểm tra Option 2 được chọn
    })

})