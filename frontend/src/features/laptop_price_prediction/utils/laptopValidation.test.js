import assert from 'node:assert/strict';
import test from 'node:test';
import { validateLaptopForm } from './laptopValidation.js';

const validLaptop = {
  brand: 'dell',
  processor: 'Intel Core i5',
  storageType: 'SSD',
  ram: 8,
  rom: 256,
  screenSize: 15.6,
  warranty: 0,
  isLaptop: 1,
};

test('laptop validation accepts supported specifications', () => {
  assert.deepEqual(validateLaptopForm(validLaptop), {});
});

test('laptop validation rejects fractional memory sizes', () => {
  assert.equal(
    validateLaptopForm({ ...validLaptop, ram: 8.5 }).ram,
    'Enter a whole number'
  );
});
