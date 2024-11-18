import { test } from '@playwright/test';

/* page.goto('http://localhost:4200/') trả về một promise, 
để xử lý chính xác kết quả từ promise, cần sử dụng await. 
*/
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

test.describe('suite1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Charts', {exact: true}).click();
    });

    test('the first test echarts', async ({ page }) => {
        await page.getByText('Echarts').click();
    });

});

test.describe('suite2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
    });

    test('the first test form layouts', async ({ page }) => {
        await page.getByText('Form Layouts').click();
    });

    test('navigate to datepicker page1', async ({ page }) => {
        await page.getByText('Datepicker').click();
    });
});