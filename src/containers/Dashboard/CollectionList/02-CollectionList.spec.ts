import { test, expect } from '@playwright/test';

test.describe('CollectionList for authenticated user', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  const newCollectionName = `New collection name ${Math.random()
    .toString(36)
    .substring(2, 10)}`;

  test('Change collection information', async ({ page }) => {
    await page.goto('http://localhost:5173/collections/all');

    await page.waitForSelector('[data-testid="tree-item"]');

    const treeItems = await page.$$('[data-testid="tree-item"]');

    const targetTreeItem = treeItems.find(async (treeItem) => {
      const treeItemText = await treeItem.$eval(
        '[data-testid="tree-item-text"]',
        (element) => element.textContent,
      );
      return treeItemText === 'Test collection name';
    });

    if (!targetTreeItem) {
      throw new Error('Test collection not found');
    }

    const editItemButton = await targetTreeItem.$(
      '[data-testid="edit-collection-item-btn"]',
    );

    if (editItemButton === null) {
      throw new Error('Edit dropdown button not found');
    }

    await editItemButton.click();

    const editDropdownButton = page.getByText('Edit collection');

    await editDropdownButton.click();

    const collectionNameInput = await page.waitForSelector(
      '[data-testid="create-collection-input"]',
    );
    await collectionNameInput.fill('');

    await collectionNameInput.fill(newCollectionName);

    const editBtn = page.getByText('Submit');

    await editBtn.click();

    const treeItemsTexts = await page.$$('[data-testid="tree-item-text"]');

    const hasEditedCollection = await Promise.all(
      treeItemsTexts.map(async (x) => {
        const text = await page.evaluate((element) => element.textContent, x);
        return text === newCollectionName;
      }),
    );

    await page.waitForTimeout(5000);

    expect(hasEditedCollection.some(Boolean)).toBeTruthy();
  });
});
