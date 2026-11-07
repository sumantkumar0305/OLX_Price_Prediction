import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const PhoneSelectField = ({ label, value, options, error, onChange, renderOption }) => (
  <TextField
    select
    fullWidth
    label={label}
    value={value}
    onChange={onChange}
    error={Boolean(error)}
    helperText={error}
  >
    {options.map((option) => {
      const optionValue = typeof option === 'string' ? option : option.value;
      const optionLabel = renderOption
        ? renderOption(optionValue)
        : typeof option === 'string'
          ? option
          : option.label;

      return (
        <MenuItem key={optionValue} value={optionValue}>
          {optionLabel}
        </MenuItem>
      );
    })}
  </TextField>
);

export default PhoneSelectField;
