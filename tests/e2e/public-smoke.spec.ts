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

  await expect(page.getByText('Moveto', { exact: true })).toBeVisible()
  await expect(page.getByText('미인증 사용자')).toBeVisible()
  await expect(page.getByText('전송할 파일을 드롭하거나 선택해주세요.')).toBeVisible()
})

test('profile route redirects anonymous users to sign-in', async ({ page }) => {
  await page.goto('/profile')

  await expect(page).toHaveURL(/\/auth\/sign-in$/)
  await expect(page.getByText('Moveto 로그인')).toBeVisible()
})

test('sign-in page shows the available auth providers', async ({ page }) => {
  await page.goto('/auth/sign-in')

  await expect(page.getByRole('button', { name: /카카오 로그인/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Github 로그인/i })).toBeVisible()
  await expect(page.getByRole('button', { name: /Passkey 로그인/i })).toBeVisible()
})
