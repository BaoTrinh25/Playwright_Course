import { Page, expect } from "@playwright/test"

export class DatepickerPage{
    private readonly page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDayFromToday: number){
        const calenderInputField = this.page.getByPlaceholder('Form Picker')
        await calenderInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDayFromToday)
        await expect(calenderInputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calenderInputField = this.page.getByPlaceholder('Range Picker')
        await calenderInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const dateAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calenderInputField).toHaveValue(dateAssert)
    }

    private async selectDateInTheCalendar(numberOfDayFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDayFromToday)
        const expectedDate = date.getDate().toString()
  
        const expectedMonthShot = date.toLocaleString('En-US', {month: 'short'}) //lấy tên viết tắt của tháng
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'}) // lấy fullname tháng

        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}` //định dạng kqua trả ra: tháng ngày, năm

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        //Kiểm tra loop click cho tới khi tháng năm trên datepicker bao gồm tháng năm như mong đợi thì dừng
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).nth(0).click()
        return dateToAssert
    }
}