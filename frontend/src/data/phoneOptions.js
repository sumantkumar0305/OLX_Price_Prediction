export const brandOptions = [
  'apple',
  'samsung',
  'vivo',
  'realme',
  'oppo',
  'xiaomi',
  'other',
  'motorola',
  'oneplus',
  'infinix',
  'lava',
  'tecno',
  'google',
  'iqoo',
  'poco',
];

export const ramOptions = ['8', '12', '6', '4', '16', 'other'];
export const romOptions = ['64', '128', '256', '512', 'other']; // GB

export const networkOptions = ['2G', '3G', '4G', '5G'];

export const warrantyOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

export const initialPhoneFormState = {
  brand: '',
  ram: '',
  rom: '',
  network: '',
  accessories: 0,
  warranty: 'no',
};
