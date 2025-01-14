import {test} from "@playwright/test"
import { PageManager } from '../../page-objects/pageManager'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/', { timeout: 40000, waitUntil: 'domcontentloaded' })
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayout()
    await pm.navigateTo().datepicker()
    await pm.navigateTo().smartTable()
    await pm.navigateTo().toastr()
    await pm.navigateTo().tooltip()
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().formLayout()
    await pm.onFormLayoutsPage().submitUsingTheGridFormatWithCredentialsAndSelectOption('test@test.com', 'Welcom1', 'Option 1')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('Jonh Smith', 'John@test.com', true)
    await pm.navigateTo().datepicker()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)

})