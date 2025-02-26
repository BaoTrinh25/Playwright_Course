import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json';

test.beforeEach(async ({page}) =>{
  //chặn và kh gọi api thật, trả về dữ liệu từ tags.json (res giả lập)
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })
  
  await page.goto('https://conduit.bondaracademy.com/')
})

test('has title', async ({ page }) => {
  //page.route dùng để chặn và điều chỉnh API trước khi đc gửi hoặc sau khi nhận về.
  await page.route('*/**/api/articles*', async route =>{
    const response = await route.fetch() //Gửi request thật để lấy dữ liệu
    const responseBody = await response.json() //chuyển đổi response thành JSON
    responseBody.articles[0].title = "This is a MOCK test title" //Chỉnh sửa tiêu đề bài viết đầu tiên
    responseBody.articles[0].description = "This is a MOCK description" //Chỉnh sửa mô tả

    await route.fulfill({
      body: JSON.stringify(responseBody) //Trả về dữ liệu đã sửa đổi
    })
  })
  await page.getByText('Global Feed').click()
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title')
  await expect(page.locator('app-article-list p').first()).toContainText('This is a MOCK description')
});

test('delete article', async({page, request}) => {
  // const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
  //   data: {
  //     "user": {"email": "baotrinhaaa@gmail.com", "password": "1234567890"}
  //   }
  // })
  // const responseBody = await response.json()
  // const accessToken = responseBody.user.token
  
  const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      "article": {"title": "this is a title article", "description": "post article", "body": "highlight", "tagList": []}
    },
    // headers: {
    //   Authorization: `Token ${accessToken}`
    // }
  }) 
  expect(articleResponse.status()).toEqual(201)

  await page.getByText('Global Feed').click()
  await page.getByText('This is a title article').click()
  await page.getByRole('button', {name: "Delete Article"}).first().click()

  await expect(page.locator('app-article-list h1').first()).not.toContainText('This is a test title')
})

test('create article', async({page, request}) => {
  await page.getByText('New Article').click()
  await page.getByRole('textbox', {name: "Article Title"}).fill('Playwright is awesome')
  await page.getByRole('textbox', {name: "What's this article about?"}).fill('About the Playwright')
  await page.getByRole('textbox', {name: "Write your article (in markdown)"}).fill('We like to use playwright for automation')
  await page.getByRole('button', {name: "Publish Article"}).click()

  const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
  const articleResponseBody = await articleResponse.json()
  const slugId = articleResponseBody.article.slug

  await expect(page.locator('.article-page h1')).toContainText('Playwright is awesome')
  await page.getByText('Home').click()
  await page.getByText('Global Feed').click()

  await expect(page.locator('app-article-list h1').first()).toContainText('Playwright is awesome')

  // const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
  //   data: {
  //     "user": {"email": "baotrinhaaa@gmail.com", "password": "1234567890"}
  //   }
  // })
  // const responseBody = await response.json()
  // const accessToken = responseBody.user.token

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`
  // , {
  //   headers: {
  //     Authorization: `Token ${accessToken}`
  //   }
  // }
  )
  expect(deleteArticleResponse.status()).toEqual(204)
})


