
export const laptopBrandOptions = [
  { value: 'macbook', label: 'MacBook' },
  { value: 'dell', label: 'Dell' },
  { value: 'others', label: 'Others' },
  { value: 'lenovo', label: 'Lenovo' },
  { value: 'hp', label: 'HP' },
  { value: 'acer', label: 'Acer' },
  { value: 'asus', label: 'ASUS' },
];

export const laptopStorageTypeOptions = ['SSD', 'Unspecified', 'HDD', 'NVMe'];

export const laptopProcessorOptions = [
  'Apple M1',
  'Apple M2',
  'Apple M3',
  'AMD Ryzen 3',
  'AMD Ryzen 5',
  'AMD Ryzen 7',
  'AMD Ryzen 9',
  'Intel Celeron',
  'Intel Core i3',
  'Intel Core i5',
  'Intel Core i7',
  'Intel Core i9',
  'Intel Core Ultra',
  'Intel Pentium',
  'Intel Xeon',
  'Unspecified',
];

// Inclusive limits; keep these aligned with validation in backend/main.py.
export const laptopLimits = {
  ram: { min: 2, max: 128, unit: 'GB' },
  rom: { min: 16, max: 8192, unit: 'GB' },
  screenSize: { min: 10, max: 40, unit: 'in' },
  warranty: { min: 0, max: 1825, unit: 'days' },
};

export const initialLaptopFormState = {
  brand: '',
  processor: '',
  ram: '',
  rom: '',
  screenSize: '',
  storageType: '',
  isLaptop: 1,
  warranty: 0,
};
