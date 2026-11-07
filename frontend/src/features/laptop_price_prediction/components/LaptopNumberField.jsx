import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { laptopLimits } from '../data/laptopOptions.js';

const LaptopNumberField = ({
  field,
  label,
  values,
  errors,
  handleChange,
  step = 1,
  hint,
}) => {
  const { min, max, unit } = laptopLimits[field];

  return (
    <TextField
      fullWidth
      type="number"
      label={label}
      value={values[field]}
      onChange={handleChange(field)}
      error={Boolean(errors[field])}
      helperText={errors[field] || hint || `${min}–${max} ${unit}`}
      inputProps={{
        min,
        max,
        step,
        inputMode: step === 1 ? 'numeric' : 'decimal',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{unit}</InputAdornment>
        ),
      }}
    />
  );
};

export default LaptopNumberField;
