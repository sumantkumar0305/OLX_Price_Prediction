import {
  laptopBrandOptions,
  laptopLimits,
  laptopProcessorOptions,
  laptopStorageTypeOptions,
} from '../data/laptopOptions.js';

export const validateLaptopForm = (values) => {
  const errors = {};

  if (!laptopBrandOptions.some((option) => option.value === values.brand)) {
    errors.brand = 'Select a brand';
  }
  if (!laptopProcessorOptions.includes(values.processor)) {
    errors.processor = 'Select a processor';
  }
  if (!laptopStorageTypeOptions.includes(values.storageType)) {
    errors.storageType = 'Select a storage type';
  }

  const checkNumber = (field, label, integer) => {
    const raw = String(values[field] ?? '').trim();
    const { min, max } = laptopLimits[field];

    if (raw === '') {
      errors[field] = `Enter ${label}`;
      return;
    }

    const number = Number(raw);
    if (!Number.isFinite(number)) {
      errors[field] = 'Enter a valid number';
    } else if (number < min || number > max) {
      errors[field] = `Enter a value between ${min} and ${max}`;
    } else if (integer && !Number.isInteger(number)) {
      errors[field] = 'Enter a whole number';
    }
  };

  checkNumber('ram', 'the RAM size', true);
  checkNumber('rom', 'the storage size', true);
  checkNumber('screenSize', 'the screen size', false);
  checkNumber('warranty', 'the warranty (0 for none)', true);

  const isLaptop = Number(values.isLaptop);
  if (
    String(values.isLaptop).trim() === '' ||
    ![0, 1].includes(isLaptop)
  ) {
    errors.isLaptop = 'Choose Laptop or Desktop';
  }

  return errors;
};
