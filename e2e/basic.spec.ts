import { test, expect } from '@playwright/test';

test.describe('Idle Theme Park — basic flows', () => {
  test('loads shell, branding, and starting cash', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Idle Theme Park/);
    const header = page.locator('header');
    await expect(header.getByText('IDLE')).toBeVisible();
    await expect(header.getByText('PARK', { exact: true })).toBeVisible();
    await expect(page.getByText('Theme Park Tycoon')).toBeVisible();
    await expect(page.getByText('$500').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /your theme park/i })).toBeVisible();
  });

  test('pause and resume', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /pause game/i }).click();
    await expect(page.getByText('PAUSED')).toBeVisible();
    await page.getByRole('button', { name: /resume game/i }).click();
    await expect(page.getByText('PAUSE')).toBeVisible();
  });

  test('shop tab loads and can purchase Carousel', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /switch to shop tab/i }).click();
    await expect(page.getByText('Build Rides')).toBeVisible({ timeout: 15_000 });
    await page.getByRole('button', { name: /buy carousel for \$150/i }).click();
    await expect(page.getByText('Carousel').first()).toBeVisible();
    const cash = page.locator('text=/^\\$350$/');
    await expect(cash.first()).toBeVisible({ timeout: 5000 });
  });

  test('guests tab shows panel', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /switch to guests tab/i }).click();
    await expect(page.getByText('Guests', { exact: true }).first()).toBeVisible();
  });

  test('stats tab shows park stats', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /switch to stats tab/i }).click();
    await expect(page.getByText('Park Stats')).toBeVisible();
    await expect(page.getByText('Total Earned')).toBeVisible();
  });
});
