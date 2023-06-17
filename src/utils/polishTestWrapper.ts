import { Page, TestInfo, test as baseTest, expect } from '@playwright/test';

type TestCallback = (
  args: { page: Page },
  testInfo?: TestInfo,
) => Promise<void> | void;

const test = (description: string, testCallback: TestCallback) =>
  baseTest.describe(description, () => {
    baseTest.use({
      viewport: { width: 1280, height: 720 },
      locale: 'pl-PL',
    });

    baseTest(`[Polish] ${description}`, async ({ page }, testInfo) => {
      await testCallback({ page }, testInfo);
    });
  });

export { test, expect };
