import Grid from '@mui/material/Grid';
import PhoneAccessoriesField from './PhoneAccessoriesField.jsx';
import PhoneSelectField from './PhoneSelectField.jsx';
import PhoneWarrantyField from './PhoneWarrantyField.jsx';
import {
  brandOptions,
  ramOptions,
  romOptions,
  networkOptions,
} from '../data/phoneOptions.js';

const PhonePredictionFields = ({ values, errors, handleChange }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <PhoneSelectField
        label="Brand"
        value={values.brand}
        options={brandOptions}
        error={errors.brand}
        onChange={handleChange('brand')}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <PhoneSelectField
        label="Network Type"
        value={values.network}
        options={networkOptions}
        error={errors.network}
        onChange={handleChange('network')}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <PhoneSelectField
        label="RAM (GB)"
        value={values.ram}
        options={ramOptions}
        error={errors.ram}
        onChange={handleChange('ram')}
        renderOption={(option) => `${option} GB`}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <PhoneSelectField
        label="ROM / Storage (GB)"
        value={values.rom}
        options={romOptions}
        error={errors.rom}
        onChange={handleChange('rom')}
        renderOption={(option) => `${option} GB`}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <PhoneAccessoriesField
        value={values.accessories}
        error={errors.accessories}
        onChange={handleChange('accessories')}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <PhoneWarrantyField
        value={values.warranty}
        onChange={handleChange('warranty')}
      />
    </Grid>
  </Grid>
);

export default PhonePredictionFields;
