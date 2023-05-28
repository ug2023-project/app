import { test, expect } from '@playwright/test';

test.describe('CollectionList for authenticated user', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('Add collection', async ({ page }) => {
    await page.goto('http://localhost:5173/collections/all');

    const createCollectionMenuBtn = await page.waitForSelector(
      '[data-testid="create-collection-menu-btn"]',
    );
    await createCollectionMenuBtn.click();

    await page.waitForSelector('[data-testid="create-collection-dropdown"]');
    await page.click('[data-testid="create-collection-open-modal-btn"]');

    const collectionNameInput = await page.waitForSelector(
      '[data-testid="create-collection-input"]',
    );
    await collectionNameInput.fill('Test collection name');

    const createCollectionBtn = await page.waitForSelector(
      '[data-testid="create-collection-btn"]',
    );
    await createCollectionBtn.click();

    await page.waitForTimeout(5000);

    const treeItemsTexts = await page.$$('[data-testid="tree-item-text"]');

    const hasCreatedCollection = await Promise.all(
      treeItemsTexts.map(async (x) => {
        const text = await page.evaluate((element) => element.textContent, x);
        return text === 'Test collection name';
      }),
    );

    expect(hasCreatedCollection.some(Boolean)).toBeTruthy();
  });
});
