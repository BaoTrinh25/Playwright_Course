/*
Page là một đối tượng đại diện cho một trang web (tab trình duyệt). 
Thông qua Page, có thể thực hiện các hành động như: click, nhập dữ liệu, kiểm tra văn bản,...
 */
import { Locator, Page } from "@playwright/test" 

export class NavigationPage {
    readonly page: Page  //readonly đảm bảo `page` không bị thay đổi
    readonly formLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        this.page = page 
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayout() {
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuItem.click()
    }

    async datepicker() {
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()
    }

    async smartTable() {    
        await this.page.getByText('Tables & Data').click()
        await this.smartTableMenuItem.click()
    }

    async toastr() {
        await this.page.getByText('Modal & Overlays').click()
        await this.toastrMenuItem.click()
    }
    
    async tooltip() {
        await this.page.getByText('Modal & Overlays').click()
        await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupMenuItem.click()
    }
}