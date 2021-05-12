// FIXME: Solid need to be transpiled with babel + babel-preset-solid

import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as allExports from '../src/index';
import {
  mocksSetup, mocksTeardown, setup, teardown,
} from './utils';

test.before(setup);
test.before(mocksSetup);
test.after(mocksTeardown);
test.after(teardown);

const publicExports = [
  ['routeTo', 'function'],
  ['Router', 'function'],
  ['NavLink', 'function'],
] as const;

publicExports.forEach(([name, type]) => {
  test(`exports public "${name}" ${type}`, () => {
    assert.is(name in allExports, true, 'is exported');
    assert.type(allExports[name], type);
  });
});

test('does not export any private internals', () => {
  const allPublicExportNames = [
    ...publicExports.map((x) => x[0]),
    'default', // synthetic default created by esbuild at test runtime
  ];
  const remainingExports = Object.keys(allExports);
  assert.is(remainingExports.length >= publicExports.length, true);
  allPublicExportNames.forEach((name) => {
    remainingExports.splice(remainingExports.indexOf(name), 1);
  });
  assert.is(remainingExports.length, 0);
});

test('has no default export', () => {
  // XXX: `allExports.default` is a synthetic default created by esbuild at test runtime

  // @ts-expect-error - created by esbuild at runtime
  assert.is(allExports.default.default, undefined); // eslint-disable-line
  assert.type(require('../dist/index'), 'object'); // eslint-disable-line
  assert.is(require('../dist/index').default, undefined); // eslint-disable-line
});

test.run();
