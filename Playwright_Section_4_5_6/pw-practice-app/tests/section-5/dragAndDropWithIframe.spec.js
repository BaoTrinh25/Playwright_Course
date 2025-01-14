import { test, expect } from '@playwright/test';

test('drag and drop with iframe', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');

  // Access the iframe
  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

  //Thao tác kéo và thả với "High Tatras 2"
  await frame.locator('li', { hasText: 'High Tatras 2' }).dragTo(frame.locator('#trash'));

  await frame.locator('li', { hasText: 'High Tatras 4' }).hover(); //Đưa chuột đến phần tử <li> có nội dung là "High Tatras 4".
  await page.mouse.down(); //nhấn giữ chuột.
  await frame.locator('#trash').hover(); // Di chuyển chuột đến vị trí thùng rác (#trash).
  await page.mouse.up(); // Thả chuột để hoàn tất hành động kéo và thả.

  // Assertion to verify items are in the trash
  await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4']);
});
