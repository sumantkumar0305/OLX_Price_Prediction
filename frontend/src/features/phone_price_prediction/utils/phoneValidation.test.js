import assert from 'node:assert/strict';
import test from 'node:test';
import { validatePhoneForm } from './phoneValidation.js';

test('phone validation accepts supported specifications', () => {
  assert.deepEqual(
    validatePhoneForm({
      brand: 'apple',
      ram: '8',
      rom: '128',
      network: '5G',
      accessories: 2,
      warranty: 'yes',
    }),
    {}
  );
});

test('phone validation rejects fractional accessory counts', () => {
  assert.equal(
    validatePhoneForm({
      brand: 'apple',
      ram: '8',
      rom: '128',
      network: '5G',
      accessories: 1.5,
      warranty: 'no',
    }).accessories,
    'Enter a whole number between 0 and 8'
  );
});
