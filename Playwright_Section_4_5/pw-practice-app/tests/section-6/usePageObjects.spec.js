import {test} from "@playwright/test"
import {NavigationPage} from '../../page-objects/navigationPage'
import { FormLayoutsPage } from '../../page-objects/formLayoutsPage'
import { DatepickerPage } from '../../page-objects/datePickerPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayout()
    await navigateTo.datepicker()
    await navigateTo.smartTable()
    await navigateTo.toastr()
    await navigateTo.tooltip()
})

test('parametrized methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatepickerPage = new DatepickerPage(page)

    await navigateTo.formLayout()
    await onFormLayoutsPage.submitUsingTheGridFormatWithCredentialsAndSelectOption('test@test.com', 'Welcom1', 'Option 1')
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Jonh Smith', 'John@test.com', true)
    await navigateTo.datepicker()
    await onDatepickerPage.selectCommonDatePickerDateFromToday(10)
    await onDatepickerPage.selectDatepickerWithRangeFromToday(6, 15)

})