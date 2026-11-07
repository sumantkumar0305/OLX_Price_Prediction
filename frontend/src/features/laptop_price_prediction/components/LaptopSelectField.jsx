import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const LaptopSelectField = ({ field, label, options, values, errors, handleChange }) => (
  <TextField
    select
    fullWidth
    label={label}
    value={values[field]}
    onChange={handleChange(field)}
    error={Boolean(errors[field])}
    helperText={errors[field]}
  >
    {options.map((option) => {
      const value = typeof option === 'string' ? option : option.value;
      const text = typeof option === 'string' ? option : option.label;
      return (
        <MenuItem key={value} value={value}>
          {text}
        </MenuItem>
      );
    })}
  </TextField>
);

export default LaptopSelectField;
