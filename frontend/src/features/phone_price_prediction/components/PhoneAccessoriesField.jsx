import TextField from '@mui/material/TextField';

const PhoneAccessoriesField = ({ value, error, onChange }) => (
  <TextField
    fullWidth
    type="number"
    label="Accessories Included"
    value={value}
    onChange={onChange}
    inputProps={{ min: 0, max: 8, step: 1, inputMode: 'numeric' }}
    error={Boolean(error)}
    helperText={error || 'Enter a whole number from 0 to 8'}
  />
);

export default PhoneAccessoriesField;
