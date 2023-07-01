import { expect, test } from '@playwright/test';
import { connectPage, destroyFixture, loadFixture, sleep, type FixtureContext } from './utils';

let context: FixtureContext;
test.beforeAll(() => {
  context = loadFixture('full');
});
test.afterAll(() => destroyFixture(context));
test.beforeEach(({ page }) => connectPage(context, page));

test('renders app', async ({ page }) => {
  await page.goto(`http://localhost:${context.port}`);
  const html = await page.innerHTML('html');
  expect(html.length > 230).toBe(true);
  expect(await page.$('nav')).not.toBeNull();
  expect(await page.$('main')).not.toBeNull();
  await sleep(200);
  expect(context.consoleMessages).toHaveLength(0);
  expect(context.unhandledErrors).toHaveLength(0);
});

test('updates URL when clicking nav items', async ({ page }) => {
  const urlBase = `http://localhost:${context.port}`;
  await page.goto(urlBase);
  await expect(page).toHaveURL(`${urlBase}/`);
  await page.click('nav>.page1');
  await expect(page).toHaveURL(`${urlBase}/page1`);
  await page.click('nav>.page2');
  await expect(page).toHaveURL(`${urlBase}/page2`);
  await page.click('nav>.home');
  await expect(page).toHaveURL(`${urlBase}/`);
  expect(context.consoleMessages).toHaveLength(0);
  expect(context.unhandledErrors).toHaveLength(0);
});

test('updates content when clicking nav items', async ({ page }) => {
  await page.goto(`http://localhost:${context.port}`);
  await expect(page.locator('main')).toContainText('Home');
  await page.click('nav>.page1');
  await expect(page.locator('main')).toContainText('Page 1');
  await page.click('nav>.page2');
  await expect(page.locator('main')).toContainText('Page 2');
  await page.click('nav>.home');
  await expect(page.locator('main')).toContainText('Home');
  expect(context.consoleMessages).toHaveLength(0);
  expect(context.unhandledErrors).toHaveLength(0);
});

// FIXME: Solid suspense does not trigger when we want it
//  ↳ https://github.com/solidjs/solid/blob/main/packages/solid/src/static/rendering.ts#L406
test.fixme("renders loading state when loading a lazy route's bundle", async ({ page }) => {
  await page.goto(`http://localhost:${context.port}`);
  const client = await page.context().newCDPSession(page);
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: (30 * 1024 * 1024) / 8,
    uploadThroughput: (15 * 1024 * 1024) / 8,
    latency: 100,
  });
  await expect(page.locator('main')).toContainText('Home');
  await page.click('nav>.page1');
  await expect(page.locator('main')).toContainText('Loading...');
  await sleep(150);
  await expect(page.locator('main')).toContainText('Page 1');
  expect(context.consoleMessages).toHaveLength(0);
  expect(context.unhandledErrors).toHaveLength(0);
});

test.fixme('renders fallback state when no matching route', async ({ page }) => {
  await page.goto(`http://localhost:${context.port}`);
  expect(context.consoleMessages).toHaveLength(0);
  expect(context.unhandledErrors).toHaveLength(0);
});
test.fixme('renders correct page when using browser forward/back buttons', async ({ page }) => {
  await page.goto(`http://localhost:${context.port}`);
  expect(context.consoleMessages).toHaveLength(0);
  expect(context.unhandledErrors).toHaveLength(0);
});
test.fixme(
  'provides component params prop with route params in dynamic route',
  async ({ page }) => {
    await page.goto(`http://localhost:${context.port}`);
    expect(context.consoleMessages).toHaveLength(0);
    expect(context.unhandledErrors).toHaveLength(0);
  },
);
test.fixme('provides component query prop with URL search query params', async ({ page }) => {
  await page.goto(`http://localhost:${context.port}`);
  expect(context.consoleMessages).toHaveLength(0);
  expect(context.unhandledErrors).toHaveLength(0);
});

// FIXME: Move to seperate file?
test.describe('NavLink', () => {
  test.fixme('has aria-current attribute when href matches URL path', async ({ page }) => {
    await page.goto(`http://localhost:${context.port}`);
    expect(context.consoleMessages).toHaveLength(0);
    expect(context.unhandledErrors).toHaveLength(0);
  });
  test.fixme(
    'has aria-current attribute when href matches URL path with deepMatch',
    async ({ page }) => {
      await page.goto(`http://localhost:${context.port}`);
      expect(context.consoleMessages).toHaveLength(0);
      expect(context.unhandledErrors).toHaveLength(0);
    },
  );
});
