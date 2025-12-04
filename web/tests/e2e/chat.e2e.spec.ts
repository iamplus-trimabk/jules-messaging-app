import { test, expect } from '@playwright/test';

test('Chat UI is rendered correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Check for the main components of the chat UI
  await expect(page.locator('h1')).toContainText('Simflo');
  await expect(page.locator('input[placeholder="Phone Number"]')).toBeVisible();
  await expect(page.locator('button:has-text("Login")')).toBeVisible();

  // Take a screenshot to visually verify the UI
  await page.screenshot({ path: 'web/tests/e2e/screenshots/chat-ui.png' });
});
