import {test, expect} from '@playwright/test'

//beforeEach : đảm bảo các bài test đều phải bắt đầu từ việc truy cập trang chủ localhost
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/', { timeout: 30000 })
})

//descibe dùng để nhóm các bài test liên quan đến phần Form Layouts
test.describe('Form Layouts page', () => {
test.describe.configure({retries: 2})

    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    //_____ 33. Input Field _____
    test('Input fields', async({page}, testInfo) => {
        if(testInfo.retry){
            
        }
        test.setTimeout(30000); // 20 giây
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

test('Checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    const checkbox = page.getByRole("checkbox")

    //check
    for (const box of await checkbox.all()) {
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }

    //uncheck
    for (const box of await checkbox.all()) {
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }
})

test('Lists and dropdowns', async({page}) => {
    const dropdown = page.locator('ngx-header nb-select')
    await dropdown.click()

    page.getByRole('list') //when the list has a UL tag
    page.getByRole('listitem') //when the list has a LI tag

    // const option =  page.getByRole('list').locator('nb-option')
    const option = page.locator('nb-option-list nb-option')
    await expect(option).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await option.filter({hasText: "Cosmic"}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropdown.click()
    //Lặp qua từng màu và chọn để thay đổi background color
    for (const color in colors) {
        await option.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate") //nếu != màu Corporate( màu cuối cùng) thì vẫn tiếp tục click dropdown để chọn màu 
            await dropdown.click()
    }
})

test('Tooltip', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()
    
    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "TOP"}).hover()

    page.getByRole('tooltip')
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('Dialog Boxes', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.locator('table tr', {hasText: "@mdo"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('@mdo')
})

test('Web Table', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1 Get the row by any test in this row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('21')
    await page.locator('.nb-checkmark').click()

    //2 Get the row based on the value in the specific column
    await page.locator('.ng2-smart-page-item', {hasText: "2"}).click()
    const rowEditById = page.locator('table tr').filter({
        has: page.locator('td').nth(1).getByText("11")})
        // has: page.getByRole('cell', { name: "11" }) // Cột chứa ID "11"
    await rowEditById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('btrinh2505@gmail.com')
    await page.locator('.nb-checkmark').click()
    await expect(rowEditById.locator('td').nth(5)).toHaveText("btrinh2505@gmail.com")

    //3 test filter of the table
    const ages = ["20", "30", "40", "200"]
    for ( let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if (age == "200") {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('Date Picker', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calenderFormPicker = page.getByPlaceholder('Form Picker')
    await calenderFormPicker.click()

    let date = new Date()
    date.setDate(date.getDate() + 400) //set ngày = lấy ngày hiện tại + số ngày
    const expectedDate = date.getDate().toString()
    /*
        'en-US': Định dạng ngày giờ theo ngôn ngữ tiếng Anh (Mỹ).
        { month: 'short' }: Chỉ định rằng chỉ cần lấy tháng, và định dạng viết tắt của tháng(short).
    */
    const expectedMonthShot = date.toLocaleString('En-US', {month: 'short'}) //lấy tên viết tắt của tháng
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}` //định dạng kqua trả ra: tháng ngày, năm

    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'}) // lấy fullname tháng
    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

    //Kiểm tra loop click cho tới khi tháng năm trên datepicker bao gồm tháng năm như mong đợi thì dừng
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
    await expect(calenderFormPicker).toHaveValue(dateToAssert)
})

test('Sliders', async({page}) => {
    //Update Attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click()

    //Mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded() //Cuộn trang để đảm bảo phần tử tempBox nằm trong vùng hiển thị của trình duyệt.

    const box = await tempBox.boundingBox() //Lấy thông tin vị trí và kích thước của slider (tọa độ x, y, chiều rộng width, chiều cao height).
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x,y) //Di chuyển chuột đến trung tâm của slider.
    await page.mouse.down() // Nhấn giữ chuột
    await page.mouse.move(x + 100, y) //Kéo chuột sang phải 100 px.
    await page.mouse.move(x + 100, y + 100) // Kéo chuột xuống dưới thêm 100 px
    await page.mouse.up() //Nhả chuột
    await expect(tempBox).toContainText('30')
})
