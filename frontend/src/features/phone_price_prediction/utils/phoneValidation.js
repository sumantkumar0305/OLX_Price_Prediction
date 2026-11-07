import {
  brandOptions,
  ramOptions,
  romOptions,
  networkOptions,
} from '../data/phoneOptions.js';

export const validatePhoneForm = (values) => {
  const errors = {};

  if (!brandOptions.includes(values.brand)) {
    errors.brand = 'Select a brand';
  }
  if (!ramOptions.includes(values.ram)) {
    errors.ram = 'Select RAM';
  }
  if (!romOptions.includes(values.rom)) {
    errors.rom = 'Select storage';
  }
  if (!networkOptions.includes(values.network)) {
    errors.network = 'Select network type';
  }
  if (!['yes', 'no'].includes(values.warranty)) {
    errors.warranty = 'Select a warranty option';
  }

  const rawAccessories = String(values.accessories ?? '').trim();
  const accessories = Number(rawAccessories);
  if (
    rawAccessories === '' ||
    !Number.isInteger(accessories) ||
    accessories < 0 ||
    accessories > 8
  ) {
    errors.accessories = 'Enter a whole number between 0 and 8';
  }

  return errors;
};
