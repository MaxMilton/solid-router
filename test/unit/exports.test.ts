/* eslint-disable no-restricted-syntax */

import { expect, test } from 'vitest';
import * as allExports from '../../src/index';

const publicExports = [
  ['routeTo', 'Function'],
  ['Router', 'Function'],
  ['NavLink', 'Function'],
  ['useURLParams', 'Function'],
] as const;

test.each(publicExports)('exports public "%s" %s', (name, type) => {
  expect.assertions(2);
  expect(allExports).toHaveProperty(name);
  expect(Object.prototype.toString.call(allExports[name])).toBe(`[object ${type}]`);
});

test('does not export any private internals', () => {
  expect.assertions(5);
  const allPublicExportNames = publicExports.map((x) => x[0]);
  expect(allPublicExportNames).toHaveLength(Object.keys(allExports).length);
  // eslint-disable-next-line guard-for-in
  for (const name in allExports) {
    expect(allPublicExportNames).toContain(name);
  }
});

test('has no default export', async () => {
  expect.assertions(3);
  // @ts-expect-error - default does not exist
  expect(allExports.default).toBeUndefined();
  // eslint-disable-next-line
  expect(typeof (await import('../../dist/index.js'))).toBe('object');
  // @ts-expect-error - default does not exist
  // eslint-disable-next-line
  expect(await import('../../dist/index.js').default).toBeUndefined();
});