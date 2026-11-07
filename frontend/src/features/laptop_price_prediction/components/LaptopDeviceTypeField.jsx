import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const LaptopDeviceTypeField = ({ value, error, onChange }) => (
  <TextField
    select
    fullWidth
    label="Device type"
    value={value}
    onChange={onChange}
    error={Boolean(error)}
    helperText={error || 'Choose whether the device is a laptop or desktop'}
  >
    <MenuItem value={1}>Laptop</MenuItem>
    <MenuItem value={0}>Desktop</MenuItem>
  </TextField>
);

export default LaptopDeviceTypeField;
