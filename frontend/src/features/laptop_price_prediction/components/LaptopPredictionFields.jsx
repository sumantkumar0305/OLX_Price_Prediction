import Grid from '@mui/material/Grid';
import LaptopDeviceTypeField from './LaptopDeviceTypeField.jsx';
import LaptopNumberField from './LaptopNumberField.jsx';
import LaptopSelectField from './LaptopSelectField.jsx';
import {
  laptopBrandOptions,
  laptopProcessorOptions,
  laptopStorageTypeOptions,
} from '../data/laptopOptions.js';

const selectFields = [
  { field: 'brand', label: 'Brand', options: laptopBrandOptions },
  { field: 'processor', label: 'Processor', options: laptopProcessorOptions },
  { field: 'storageType', label: 'Storage Type', options: laptopStorageTypeOptions },
];

const numberFields = [
  { field: 'ram', label: 'RAM (GB)' },
  { field: 'rom', label: 'ROM / Storage (GB)' },
  { field: 'screenSize', label: 'Screen Size (inches)', step: 0.1 },
  { field: 'warranty', label: 'Warranty (Days)', hint: 'Enter 0 if there is no warranty' },
];

const LaptopPredictionFields = ({ values, errors, handleChange }) => (
  <Grid container spacing={3}>
    {selectFields.map(({ field, label, options }) => (
      <Grid item xs={12} sm={6} key={field}>
        <LaptopSelectField
          field={field}
          label={label}
          options={options}
          values={values}
          errors={errors}
          handleChange={handleChange}
        />
      </Grid>
    ))}
    {numberFields.map(({ field, label, step, hint }) => (
      <Grid item xs={12} sm={6} key={field}>
        <LaptopNumberField
          field={field}
          label={label}
          values={values}
          errors={errors}
          handleChange={handleChange}
          step={step}
          hint={hint}
        />
      </Grid>
    ))}
    <Grid item xs={12} sm={6}>
      <LaptopDeviceTypeField
        value={values.isLaptop}
        error={errors.isLaptop}
        onChange={handleChange('isLaptop')}
      />
    </Grid>
  </Grid>
);

export default LaptopPredictionFields;
