import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import {
  brandOptions,
  ramOptions,
  romOptions,
  networkOptions,
} from '../data/phoneOptions.js';

const PhonePredictionFields = ({
  values,
  errors,
  handleChange,
  handleAccessoriesChange,
}) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <TextField
        select
        fullWidth
        label="Brand"
        value={values.brand}
        onChange={handleChange('brand')}
        error={Boolean(errors.brand)}
        helperText={errors.brand}
      >
        {brandOptions.map((brand) => (
          <MenuItem key={brand} value={brand}>
            {brand}
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        select
        fullWidth
        label="Network Type"
        value={values.network}
        onChange={handleChange('network')}
        error={Boolean(errors.network)}
        helperText={errors.network}
      >
        {networkOptions.map((network) => (
          <MenuItem key={network} value={network}>
            {network}
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        select
        fullWidth
        label="RAM (GB)"
        value={values.ram}
        onChange={handleChange('ram')}
        error={Boolean(errors.ram)}
        helperText={errors.ram}
      >
        {ramOptions.map((ram) => (
          <MenuItem key={ram} value={ram}>
            {ram} GB
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        select
        fullWidth
        label="ROM / Storage (GB)"
        value={values.rom}
        onChange={handleChange('rom')}
        error={Boolean(errors.rom)}
        helperText={errors.rom}
      >
        {romOptions.map((rom) => (
          <MenuItem key={rom} value={rom}>
            {rom} GB
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        type="number"
        label="Accessories Included"
        value={values.accessories}
        onChange={handleAccessoriesChange}
        inputProps={{ min: 0, max: 8, step: 1 }}
        error={Boolean(errors.accessories)}
        helperText={errors.accessories || 'Enter number of accessories (0–8)'}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <FormControl>
        <FormLabel sx={{ fontSize: '0.85rem', mb: 0.5 }}>
          Warranty
        </FormLabel>
        <RadioGroup
          row
          value={values.warranty}
          onChange={handleChange('warranty')}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </Grid>
  </Grid>
);

export default PhonePredictionFields;
