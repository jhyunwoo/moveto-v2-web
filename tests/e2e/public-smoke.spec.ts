import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('**/api/user/storage', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ storageSize: 0 }),
    })
  )
})

test('homepage renders the core upload shell', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('banner').getByRole('link', { name: 'Moveto 홈' })).toBeVisible()
  await expect(page.getByText('미인증 사용자')).toBeVisible()
  await expect(page.getByText('여기에 파일을 놓으세요')).toBeVisible()
})

test('homepage remains stable at 320px with reduced motion', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  await page.setViewportSize({ width: 320, height: 720 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const layoutWidth = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }))

  expect(layoutWidth.content).toBe(layoutWidth.viewport)
  expect(consoleErrors).toEqual([])
})

test('profile route redirects anonymous users to sign-in', async ({ page }) => {
  await page.goto('/profile')

  await expect(page).toHaveURL(/\/auth\/sign-in$/)
  await expect(page.getByText('Moveto 로그인')).toBeVisible()
})

test('sign-in page shows the available auth providers', async ({ page }) => {
  await page.goto('/auth/sign-in')

  await expect(page.getByRole('button', { name: /Github 로그인/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Google 로그인/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Passkey 로그인/i })).toBeVisible()
})
